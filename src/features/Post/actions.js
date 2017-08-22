import combine from '../../utils/combine';
/*
 * EXPORTING REDUCERS and SAGAS
 */
import getPostsBy, { getPostsByReducer } from './actions/getPostsBy';
import getOnePost, { getOnePostReducer } from './actions/getOnePost';

/*export const reducer = combineReducers({
  read: getOnePostReducer,
  categories: getPostsByReducer,
});*/

const initialState = {
  posts: {},
  currentPostId: undefined,
  currentCategory: '',
  currentTopic: '',
  categories: {
    created: {},
    feed: {},
    blog: {},
    trending: {},
  }
};

export const reducer = (state = initialState, action) => combine(
  [ getPostsByReducer, getOnePostReducer ],
  state,
  action,
);

// All sagas to be loaded
export default [
  getPostsBy,
  getOnePost,
];
