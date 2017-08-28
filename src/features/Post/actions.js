import combine from 'utils/combine';
/*
 * EXPORTING REDUCERS and SAGAS
 */
import getPostsBy, { getPostsByReducer } from './actions/getPostsBy';
import getOnePost, { getOnePostReducer } from './actions/getOnePost';
import uploadFile, { uploadFileReducer } from './actions/uploadFile';
import publishContent, { publishContentReducer } from './actions/publishContent';
import { setCategoryTagReducer } from './actions/setCategoryTag';

const initialState = {
  posts: {},
  currentPostId: undefined,
  currentCategory: '',
  currentTag: '',
  categories: {
    created: {},
    feed: {},
    blog: {},
    trending: {},
  },
  publishFormOpen: false,
  isPublishing: false,
};

export const reducer = (state = initialState, action) => combine(
  [ getPostsByReducer, getOnePostReducer, uploadFileReducer, publishContentReducer, setCategoryTagReducer ],
  state,
  action,
);

// All sagas to be loaded
export default [
  getPostsBy,
  getOnePost,
  uploadFile,
  publishContent,
];
