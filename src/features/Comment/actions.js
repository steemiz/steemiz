import combine from '../../utils/combine';

/*
 * EXPORTING REDUCERS and SAGAS
 */
import getCommentsFromPost, { getCommentsFromPostReducer } from './actions/getCommentsFromPost';
import getCommentsFromUser, { getCommentsFromUserReducer } from './actions/getCommentsFromUser';
import getRepliesToUser, { getRepliesToUserReducer } from './actions/getRepliesToUser';
import commentsReducer from './reducer';

export const initialState = {
  commentsChild: {},
  commentsData: {},
  commentsByPost: {},
  commentsByUser: {},
  repliesToUser: {},
};

export const reducer = (state = initialState, action) => combine(
  [ getCommentsFromPostReducer, getRepliesToUserReducer, getCommentsFromUserReducer, commentsReducer ],
  state,
  action,
);

// All sagas to be loaded
export default [
  getCommentsFromPost,
  getCommentsFromUser,
  getRepliesToUser,
];
