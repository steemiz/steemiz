import { call, put, takeLatest } from 'redux-saga/effects';
import update from 'immutability-helper';
import steem from 'steem';

/*--------- CONSTANTS ---------*/
const GET_FOLLOWER_COUNT_BEGIN = 'GET_FOLLOWER_COUNT_BEGIN';
const GET_FOLLOWER_COUNT_SUCCESS = 'GET_FOLLOWER_COUNT_SUCCESS';
const GET_FOLLOWER_COUNT_FAILURE = 'GET_FOLLOWER_COUNT_FAILURE';

/*--------- ACTIONS ---------*/
export function getFollowerCountBegin(accountName) {
  return { type: GET_FOLLOWER_COUNT_BEGIN, accountName };
}

export function getFollowerCountSuccess(accountName, count) {
  return { type: GET_FOLLOWER_COUNT_SUCCESS, accountName, count };
}

export function getFollowerCountFailure(message) {
  return { type: GET_FOLLOWER_COUNT_FAILURE, message };
}

/*--------- REDUCER ---------*/
export function getFollowerCountReducer(state, action) {
  switch (action.type) {
    case GET_FOLLOWER_COUNT_SUCCESS: {
      const { accountName, count } = action;
      return update(state, {
        followers: {
          [accountName]: {$auto: {$merge: {
            count: count.follower_count,
          }}},
        },
        followings: {
          [accountName]: {$auto: {$merge: {
            count: count.following_count,
          }}},
        },
      });
    }
    default:
      return state;
  }
}

/*--------- SAGAS ---------*/
function* getFollowerCount({ accountName }) {
  try {
    const count = yield call(() => new Promise(resolve => resolve(steem.api.getFollowCountAsync(accountName))));
    yield put(getFollowerCountSuccess(accountName, count));
  } catch(e) {
    yield put(getFollowerCountFailure(e.message));
  }
}

export default function* getFollowerCountManager() {
  yield takeLatest(GET_FOLLOWER_COUNT_BEGIN, getFollowerCount);
}
