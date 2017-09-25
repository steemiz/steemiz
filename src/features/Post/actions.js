import combine from 'utils/combine';
/*
 * EXPORTING REDUCERS and SAGAS
 */
import getPostsBy, { getPostsByReducer } from './actions/getPostsBy';
import getOnePost, { getOnePostReducer } from './actions/getOnePost';
import uploadFile from './actions/uploadFile';
import publishContent, { publishContentReducer } from './actions/publishContent';
import resteem, { resteemReducer } from './actions/resteem';
import postsReducer from './reducer';

const initialState = {
  posts: {},
  currentPostId: undefined,
  categories: {
    created: {},
    feed: {},
    blog: {},
    trending: {},
    hot: {},
  },
  publishFormOpen: false,
  isPublishing: false,
};

export const reducer = (state = initialState, action) => combine(
  [
    getPostsByReducer,
    getOnePostReducer,
    publishContentReducer,
    postsReducer,
    resteemReducer,
  ],
  state,
  action,
);

// All sagas to be loaded
export default [
  getPostsBy,
  getOnePost,
  uploadFile,
  publishContent,
  resteem,
];
