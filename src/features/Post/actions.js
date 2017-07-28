import combine from '../../utils/combine';

/*
 * EXPORTING REDUCERS and SAGAS
 */
import getPostsBy, { getPostsByReducer } from './actions/getPostsBy';
import getOnePost, { getOnePostReducer } from './actions/getOnePost';
import vote, { voteReducer } from './actions/vote';

export const initialState = {
  read: {},
};

export const postReducer = (state = initialState, action) => combine(
  [ getPostsByReducer, getOnePostReducer, voteReducer ],
  state,
  action,
);

// All sagas to be loaded
export default [
  getPostsBy,
  getOnePost,
  vote,
];
