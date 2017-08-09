import { call, put, takeEvery } from 'redux-saga/effects';
import steem from 'steem';
import { getRootCommentsList } from '../utils/comments';

/*--------- CONSTANTS ---------*/
const GET_COMMENTS_FROM_USER_BEGIN = 'GET_COMMENTS_FROM_USER_BEGIN';
export const GET_COMMENTS_FROM_USER_SUCCESS = 'GET_COMMENTS_FROM_USER_SUCCESS';
const GET_COMMENTS_FROM_USER_FAILURE = 'GET_COMMENTS_FROM_USER_FAILURE';

/*--------- ACTIONS ---------*/
export function getCommentsFromUserBegin(accountName) {
  return { type: GET_COMMENTS_FROM_USER_BEGIN, accountName };
}

export function getCommentsFromUserSuccess(accountName, state) {
  return { type: GET_COMMENTS_FROM_USER_SUCCESS, accountName, state };
}

export function getCommentsFromUserFailure(message) {
  return { type: GET_COMMENTS_FROM_USER_FAILURE, message };
}

/*--------- REDUCER ---------*/
export function getCommentsFromUserReducer(state, action) {
  switch (action.type) {
    case GET_COMMENTS_FROM_USER_SUCCESS: {
      return {
        ...state,
        commentsByUser: {
          ...state.commentsByUser,
          [action.accountName]: {
            list: getRootCommentsList(action.state),
          },
        },
      }
    }
    default:
      return state;
  }
}

/*--------- SAGAS ---------*/
function* getCommentsFromUser({ accountName }) {
  try {
    const state = yield steem.api.getStateAsync(`@${accountName}/comments`);

    yield put(getCommentsFromUserSuccess(accountName, state));
  } catch(e) {
    yield put(getCommentsFromUserFailure(e.message));
  }
}

export default function* getCommentsFromUserManager() {
  yield takeEvery(GET_COMMENTS_FROM_USER_BEGIN, getCommentsFromUser);
}
