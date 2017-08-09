import { put, takeEvery } from 'redux-saga/effects';
import steem from 'steem';
import format from '../utils/format';

/*--------- CONSTANTS ---------*/
const GET_ONE_POST_BEGIN = 'GET_ONE_POST_BEGIN';
const GET_ONE_POST_SUCCESS = 'GET_ONE_POST_SUCCESS';
const GET_ONE_POST_FAILURE = 'GET_ONE_POST_FAILURE';

/*--------- ACTIONS ---------*/
export function getOnePostBegin(author, permlink) {
  return { type: GET_ONE_POST_BEGIN, author, permlink };
}

export function getOnePostSuccess(post) {
  return { type: GET_ONE_POST_SUCCESS, post };
}

export function getOnePostFailure(message) {
  return { type: GET_ONE_POST_FAILURE, message };
}

/*--------- REDUCER ---------*/
export function getOnePostReducer(state = {}, action) {
  switch (action.type) {
    case GET_ONE_POST_SUCCESS:
      return action.post;
    default:
      return state;
  }
}

/*--------- SAGAS ---------*/
function* getOnePost({ author, permlink }) {
  try {
    let post = yield steem.api.getContent(author, permlink);
    yield put(getOnePostSuccess(format(post)));
  } catch(e) {
    yield put(getOnePostFailure(e.message));
  }
}

export default function* getOnePostManager() {
  yield takeEvery(GET_ONE_POST_BEGIN, getOnePost);
}
