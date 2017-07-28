import combine from '../../utils/combine';

/*
 * EXPORTING REDUCERS and SAGAS
 */
import getPostsBy, { getPostsByReducer } from './actions/getPostsBy';
import getOnePost, { getOnePostReducer } from './actions/getOnePost';
import getComments, { getCommentsReducer } from './actions/getComments';
import vote, { voteReducer } from './actions/vote';

export const initialState = {
  read: {},
  comments: {
    commentsChild: {},
    commentsData: {},
  },
};

export const postReducer = (state = initialState, action) => combine(
  [ getPostsByReducer, getOnePostReducer, getCommentsReducer, voteReducer ],
  state,
  action,
);

// All sagas to be loaded
export default [
  getPostsBy,
  getOnePost,
  getComments,
  vote,
];
