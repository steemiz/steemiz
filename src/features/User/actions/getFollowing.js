import { takeEvery, call, put, select } from 'redux-saga/effects';
import steem from 'steem';

import { getAccountsBegin } from './getAccounts';

/*--------- CONSTANTS ---------*/
const GET_FOLLOWING_BEGIN = 'GET_FOLLOWING_BEGIN';
const GET_FOLLOWING_SUCCESS = 'GET_FOLLOWING_SUCCESS';
const GET_FOLLOWING_FAILURE = 'GET_FOLLOWING_FAILURE';

/*--------- ACTIONS ---------*/
export function getFollowingBegin(accountName, startFollowing = '') {
  return { type: GET_FOLLOWING_BEGIN, accountName, startFollowing };
}

export function getFollowingSuccess(accountName, following) {
  return { type: GET_FOLLOWING_SUCCESS, accountName, following };
}

export function getFollowingFailure(message) {
  return { type: GET_FOLLOWING_FAILURE, message };
}

/*--------- REDUCER ---------*/
export function getFollowingReducer(state, action) {
  switch (action.type) {
    case GET_FOLLOWING_SUCCESS:
      const { accountName, following } = action;
      const { accounts } = state;
      return {
        ...state,
        accounts: {
          ...accounts,
          [accountName]: {
            ...accounts[accountName],
            following: [
              ...(accounts[accountName] && accounts[accountName].following ? accounts[accountName].following : []),
              ...following,
            ],
          }
        }
      };
    default:
      return state;
  }
}

/*--------- SAGAS ---------*/
function* getFollowing({ accountName, startFollowing }) {
  try {
    const following = yield call(() => new Promise(resolve => resolve(steem.api.getFollowing(accountName, startFollowing, 'blog', 10))));
    yield put(getFollowingSuccess(accountName, following));

    // Get following accounts
    const accountNames = following.map(account => account.following);
    if (accountNames.length > 0) {
      yield put(getAccountsBegin(accountNames));
    }
  } catch(e) {
    yield put(getFollowingFailure(e.message));
  }
}

export default function* getFollowingManager() {
  yield takeEvery(GET_FOLLOWING_BEGIN, getFollowing);
}
