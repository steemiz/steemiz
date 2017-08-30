import { select, take, call, put, takeEvery } from 'redux-saga/effects';
import steem from 'steem';
import update from 'immutability-helper';

import { selectLastFollowing, selectAccounts, selectFollowingsList } from '../selectors';
import { getAccountsBegin, GET_ACCOUNTS_SUCCESS } from './getAccounts';

/*--------- CONSTANTS ---------*/
const GET_FOLLOWINGS_BEGIN = 'GET_FOLLOWINGS_BEGIN';
const GET_FOLLOWINGS_SUCCESS = 'GET_FOLLOWINGS_SUCCESS';
const GET_FOLLOWINGS_FAILURE = 'GET_FOLLOWINGS_FAILURE';
const GET_FOLLOWINGS_END = 'GET_FOLLOWINGS_END';

/*--------- ACTIONS ---------*/
export function getFollowingsBegin(accountName, query = {}) {
  return { type: GET_FOLLOWINGS_BEGIN, accountName, query };
}

export function getFollowingsSuccess(accountName, followings) {
  return { type: GET_FOLLOWINGS_SUCCESS, accountName, followings };
}

export function getFollowingsFailure(message) {
  return { type: GET_FOLLOWINGS_FAILURE, message };
}

export function getFollowingsEnd(accountName) {
  return { type: GET_FOLLOWINGS_END, accountName };
}

/*--------- REDUCER ---------*/
export function getFollowingsReducer(state, action) {
  switch (action.type) {
    case GET_FOLLOWINGS_BEGIN: {
      const { accountName } = action;
      return update(state, {
        followings: {
          [accountName]: {$auto: {
            list: {$autoArray: {}},
            isLoading: {$set: true},
            hasMore: {$set: true},
          }},
        },
      });
    }
    case GET_FOLLOWINGS_SUCCESS: {
      const { accountName, followings } = action;
      return update(state, {
        followings: {
          [accountName]: {
            list: {$push: followings},
            isLoading: {$set: false},
          },
        },
      });
    }
    case GET_FOLLOWINGS_END: {
      const { accountName } = action;
      return update(state, {
        followings: {
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
function* getFollowings({ accountName, query }) {
  try {
    let startFollowing = '';
    let limit = 20;
    if (query.addMore) {
      const lastFollowing = yield select(selectLastFollowing(accountName));
      startFollowing = lastFollowing.following;
      limit = limit + 1;
    }

    let followings = yield call(() => new Promise(resolve => resolve(steem.api.getFollowing(accountName, startFollowing, 'blog', limit))));
    if (followings.length < limit) {
      yield put(getFollowingsEnd(accountName));
    }

    if (query.addMore) {
      followings = followings.slice(1);
    }

    // FILTER RESULTS FOR ACCOUNTS ALREADY IN FOLLOWERS
    const followingsList = yield select(selectFollowingsList(accountName));
    const filteredFollowings = followings.filter(following => !followingsList.find(followingState => followingState.following === following.following));

    // Get followings accounts
    const accounts = yield select(selectAccounts());
    const arrayAccounts = Object.keys(accounts);

    const accountNames = followings
      .map(account => account.following)
      // Removes accounts already in state.accounts
      .filter(accountName => !arrayAccounts.includes(accountName));
    if (accountNames.length > 0) {
      yield put(getAccountsBegin(accountNames));
    }
    yield take(GET_ACCOUNTS_SUCCESS);
    yield put(getFollowingsSuccess(accountName, filteredFollowings));
  } catch(e) {
    yield put(getFollowingsFailure(e.message));
  }
}

export default function* getFollowingsManager() {
  yield takeEvery(GET_FOLLOWINGS_BEGIN, getFollowings);
}
