import { select, call, put, takeEvery } from 'redux-saga/effects';
import steem from 'steem';
import update from 'immutability-helper';

import { selectLastFollower } from '../selectors';
import { getAccountsBegin } from './getAccounts';

/*--------- CONSTANTS ---------*/
const GET_FOLLOWERS_BEGIN = 'GET_FOLLOWERS_BEGIN';
const GET_FOLLOWERS_SUCCESS = 'GET_FOLLOWERS_SUCCESS';
const GET_FOLLOWERS_FAILURE = 'GET_FOLLOWERS_FAILURE';

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

/*--------- REDUCER ---------*/
export function getFollowersReducer(state, action) {
  switch (action.type) {
    case GET_FOLLOWERS_BEGIN: {
      const { accountName } = action;
      return update(state, {
        followers: {
          [accountName]: {$auto: {
            isLoading: {$set: true},
          }},
        },
      });
    }
    case GET_FOLLOWERS_SUCCESS: {
      const { accountName, followers } = action;
      const hasMore = !(followers.length < 10);
      return update(state, {
        followers: {
          [accountName]: {$auto: {
            list: {$autoArray: {$push: followers}},
            isLoading: {$set: false},
            hasMore: {$set: hasMore},
          }},
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
    let limit = 10;
    if (query.addMore) {
      const lastFollower = yield select(selectLastFollower(accountName));
      startFollower = lastFollower.follower;
      limit = limit + 1;
    }

    let followers = yield call(() => new Promise(resolve => resolve(steem.api.getFollowers(accountName, startFollower, 'blog', limit))));
    if (query.addMore) {
      followers = followers.slice(1);
    }
    yield put(getFollowersSuccess(accountName, followers));

    // Get followers accounts
    const accountNames = followers.map(account => account.follower);
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
