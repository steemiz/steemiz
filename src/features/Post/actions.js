import { combineReducers } from 'redux';

/*
 * EXPORTING REDUCERS and SAGAS
 */
import getPostsBy, { getPostsByReducer } from './actions/getPostsBy';
import getOnePost, { getOnePostReducer } from './actions/getOnePost';

export const reducer = combineReducers({
  read: getOnePostReducer,
  categories: getPostsByReducer,
});

/*export const reducer = (state = initialState, action) => combine(
  [ getPostsByReducer, getOnePostReducer ],
  state,
  action,
);*/

// All sagas to be loaded
export default [
  getPostsBy,
  getOnePost,
];
