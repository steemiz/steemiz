import { takeEvery, call, put, select } from 'redux-saga/effects';
import steem from 'steem';

import { getAccountsBegin } from './getAccounts';

/*--------- CONSTANTS ---------*/
const GET_FOLLOWERS_BEGIN = 'GET_FOLLOWERS_BEGIN';
const GET_FOLLOWERS_SUCCESS = 'GET_FOLLOWERS_SUCCESS';
const GET_FOLLOWERS_FAILURE = 'GET_FOLLOWERS_FAILURE';

/*--------- ACTIONS ---------*/
export function getFollowersBegin(accountName, startFollower = '') {
  return { type: GET_FOLLOWERS_BEGIN, accountName, startFollower };
}

export function getFollowersSuccess(accountName, followers) {
  return { type: GET_FOLLOWERS_SUCCESS, accountName, followers };
}

export function getFollowersFailure(message) {
  return { type: GET_FOLLOWERS_FAILURE, message };
}

/*--------- REDUCER ---------*/
export function getFollowersReducer(state, action) {
  switch (action.type) {
    case GET_FOLLOWERS_SUCCESS:
      const { accountName, followers } = action;
      const { accounts } = state;
      return {
        ...state,
        accounts: {
          ...accounts,
          [accountName]: {
            ...accounts[accountName],
            followers: [
              ...(accounts[accountName] && accounts[accountName].followers ? accounts[accountName].followers : []),
              ...followers,
            ],
          }
        }
      };
    default:
      return state;
  }
}

/*--------- SAGAS ---------*/
function* getFollowers({ accountName, startFollower }) {
  try {
    const followers = yield call(() => new Promise(resolve => resolve(steem.api.getFollowers(accountName, startFollower, 'blog', 10))));
    yield put(getFollowersSuccess(accountName, followers));

    // Get following accounts
    const accountNames = followers.map(account => account.followers);
    if (accountNames.length > 0) {
      yield put(getAccountsBegin(accountNames));
    }
  } catch(e) {
    yield put(getFollowersFailure(e.message));
  }
}

export default function* getFollowersManager() {
  yield takeEvery(GET_FOLLOWERS_BEGIN, getFollowers);
}
