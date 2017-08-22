import { select, call, put, takeEvery } from 'redux-saga/effects';
import steem from 'steem';
import update from 'immutability-helper';

import { selectLastFollowing } from '../selectors';
import { getAccountsBegin } from './getAccounts';

/*--------- CONSTANTS ---------*/
const GET_FOLLOWINGS_BEGIN = 'GET_FOLLOWINGS_BEGIN';
const GET_FOLLOWINGS_SUCCESS = 'GET_FOLLOWINGS_SUCCESS';
const GET_FOLLOWINGS_FAILURE = 'GET_FOLLOWINGS_FAILURE';

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

/*--------- REDUCER ---------*/
export function getFollowingsReducer(state, action) {
  switch (action.type) {
    case GET_FOLLOWINGS_BEGIN: {
      const { accountName } = action;
      return update(state, {
        followings: {
          [accountName]: {$auto: {
            isLoading: {$set: true},
          }},
        },
      });
    }
    case GET_FOLLOWINGS_SUCCESS: {
      const { accountName, followings } = action;
      const hasMore = !(followings.length < 10);
      return update(state, {
        followings: {
          [accountName]: {$auto: {
            list: {$autoArray: {$push: followings}},
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
function* getFollowings({ accountName, query }) {
  try {
    let startFollowing = '';
    let limit = 10;
    if (query.addMore) {
      const lastFollowing = yield select(selectLastFollowing(accountName));
      startFollowing = lastFollowing.following;
      limit = limit + 1;
    }

    let followings = yield call(() => new Promise(resolve => resolve(steem.api.getFollowing(accountName, startFollowing, 'blog', limit))));
    if (query.addMore) {
      followings = followings.slice(1);
    }
    yield put(getFollowingsSuccess(accountName, followings));

    // Get followings accounts
    const accountNames = followings.map(account => account.following);
    if (accountNames.length > 0) {
      yield put(getAccountsBegin(accountNames));
    }
  } catch(e) {
    yield put(getFollowingsFailure(e.message));
  }
}

export default function* getFollowingsManager() {
  yield takeEvery(GET_FOLLOWINGS_BEGIN, getFollowings);
}
