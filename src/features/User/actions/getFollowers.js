import { select, take, call, put, takeEvery } from 'redux-saga/effects';
import steem from 'steem';
import update from 'immutability-helper';

import { selectLastFollower, selectFollowersList, selectAccounts } from '../selectors';
import { getAccountsBegin, GET_ACCOUNTS_SUCCESS } from './getAccounts';

/*--------- CONSTANTS ---------*/
const GET_FOLLOWERS_BEGIN = 'GET_FOLLOWERS_BEGIN';
const GET_FOLLOWERS_SUCCESS = 'GET_FOLLOWERS_SUCCESS';
const GET_FOLLOWERS_FAILURE = 'GET_FOLLOWERS_FAILURE';
const GET_FOLLOWERS_END = 'GET_FOLLOWERS_END';

/*--------- ACTIONS ---------*/
export function getFollowersBegin(accountName, query = {}) {
  return { type: GET_FOLLOWERS_BEGIN, accountName, query };
}

export function getFollowersSuccess(accountName, followers) {
  return { type: GET_FOLLOWERS_SUCCESS, accountName, followers };
}

export function getFollowersFailure(message) {
  return { type: GET_FOLLOWERS_FAILURE, message };
}

export function getFollowersEnd(accountName) {
  return { type: GET_FOLLOWERS_END, accountName };
}

/*--------- REDUCER ---------*/
export function getFollowersReducer(state, action) {
  switch (action.type) {
    case GET_FOLLOWERS_BEGIN: {
      const { accountName } = action;
      return update(state, {
        followers: {
          [accountName]: {$auto: {
            list: {$autoArray: {}},
            isLoading: {$set: true},
            hasMore: {$set: true},
          }},
        },
      });
    }
    case GET_FOLLOWERS_SUCCESS: {
      const { accountName, followers } = action;
      return update(state, {
        followers: {
          [accountName]: {
            list: {$push: followers},
            isLoading: {$set: false},
          },
        },
      });
    }
    case GET_FOLLOWERS_END: {
      const { accountName } = action;
      return update(state, {
        followers: {
          [accountName]: {
            hasMore: {$set: false},
          },
        },
      });
    }
    default:
      return state;
  }
}

/*--------- SAGAS ---------*/
function* getFollowers({ accountName, query }) {
  try {
    let startFollower = '';
    let limit = 20;
    if (query.addMore) {
      const lastFollower = yield select(selectLastFollower(accountName));
      startFollower = lastFollower.follower;
      limit = limit + 1;
    }

    let followers = yield call(() => new Promise(resolve => resolve(steem.api.getFollowers(accountName, startFollower, 'blog', limit))));
    if (followers.length < limit) {
      yield put(getFollowersEnd(accountName));
    }

    if (query.addMore) {
      followers = followers.slice(1);
    }

    // FILTER RESULTS FOR ACCOUNTS ALREADY IN FOLLOWERS
    const followersList = yield select(selectFollowersList(accountName));
    const filteredFollowers = followers.filter(follower => !followersList.find(followerState => followerState.follower === follower.follower));

    // Get followers accounts
    const accounts = yield select(selectAccounts());
    const arrayAccounts = Object.keys(accounts);

    const accountNames = followers
      .map(account => account.follower)
      // Removes accounts already in state.accounts
      .filter(accountName => !arrayAccounts.includes(accountName));
    if (accountNames.length > 0) {
      yield put(getAccountsBegin(accountNames));
    }
    yield take(GET_ACCOUNTS_SUCCESS);
    yield put(getFollowersSuccess(accountName, filteredFollowers));
  } catch(e) {
    yield put(getFollowersFailure(e.message));
  }
}

export default function* getFollowersManager() {
  yield takeEvery(GET_FOLLOWERS_BEGIN, getFollowers);
}
