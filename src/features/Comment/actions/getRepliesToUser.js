import { call, put, takeEvery } from 'redux-saga/effects';
import steem from 'steem';
import { getRootCommentsList } from '../utils/comments';

/*--------- CONSTANTS ---------*/
const GET_REPLIES_TO_USER_BEGIN = 'GET_REPLIES_TO_USER_BEGIN';
export const GET_REPLIES_TO_USER_SUCCESS = 'GET_REPLIES_TO_USER_SUCCESS';
const GET_REPLIES_TO_USER_FAILURE = 'GET_REPLIES_TO_USER_FAILURE';

/*--------- ACTIONS ---------*/
export function getRepliesToUserBegin(accountName) {
  return { type: GET_REPLIES_TO_USER_BEGIN, accountName };
}

export function getRepliesToUserSuccess(accountName, state) {
  return { type: GET_REPLIES_TO_USER_SUCCESS, accountName, state };
}

export function getRepliesToUserFailure(message) {
  return { type: GET_REPLIES_TO_USER_FAILURE, message };
}

/*--------- REDUCER ---------*/
export function getRepliesToUserReducer(state, action) {
  switch (action.type) {
    case GET_REPLIES_TO_USER_SUCCESS: {
      return {
        ...state,
        repliesToUser: {
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
function* getRepliesToUser({ accountName }) {
  try {
    const state = yield steem.api.getStateAsync(`@${accountName}/recent-replies`);

    yield put(getRepliesToUserSuccess(accountName, state));
  } catch(e) {
    yield put(getRepliesToUserFailure(e.message));
  }
}

export default function* getRepliesToUserManager() {
  yield takeEvery(GET_REPLIES_TO_USER_BEGIN, getRepliesToUser);
}
