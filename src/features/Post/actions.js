import combine from '../../utils/combine';

/*
 * EXPORTING REDUCERS and SAGAS
 */
import getPostsBy, { getPostsByReducer } from './actions/getPostsBy';
import getOnePost, { getOnePostReducer } from './actions/getOnePost';
import postReducer from './reducer';

export const initialState = {
  read: {},
};

export const reducer = (state = initialState, action) => combine(
  [ getPostsByReducer, getOnePostReducer, postReducer ],
  state,
  action,
);

// All sagas to be loaded
export default [
  getPostsBy,
  getOnePost,
];
