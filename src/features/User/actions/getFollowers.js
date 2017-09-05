import { select, take, call, put, takeEvery } from 'redux-saga/effects';
import steem from 'steem';
import update from 'immutability-helper';

import { selectAccounts } from '../selectors';
import { getAccountsBegin, GET_ACCOUNTS_SUCCESS } from './getAccounts';

/*--------- CONSTANTS ---------*/
const GET_FOLLOWERS_BEGIN = 'GET_FOLLOWERS_BEGIN';
const GET_FOLLOWERS_SUCCESS = 'GET_FOLLOWERS_SUCCESS';
const GET_FOLLOWERS_FAILURE = 'GET_FOLLOWERS_FAILURE';
const GET_FOLLOWERS_END = 'GET_FOLLOWERS_END';

/*--------- ACTIONS ---------*/
export function getFollowersBegin(accountName, query = {}, fetchProfiles = false, limit = 0) {
  return { type: GET_FOLLOWERS_BEGIN, accountName, query, fetchProfiles, limit };
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
            list: {$apply: list => {
              // FILTER RESULTS FOR ACCOUNTS ALREADY IN FOLLOWERS
              const filteredFollowers = followers.filter(follower => !list.find(followerState => followerState.follower === follower.follower));
              return [
                ...list,
                ...filteredFollowers,
              ]
            }},
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
function* getFollowers(props) {
  const { accountName, query, fetchProfiles } = props;
  let { limit } = props;
  let endList = false;
  try {
    let startFollower = '';

    // limit = 0, get all followers
    if (limit === 0) {
      limit = 1000;
    }
    if (query.addMore) {
      startFollower = query.lastFollower;
      limit = limit + 1;
    }

    let followers = yield call(() => new Promise(resolve => resolve(steem.api.getFollowers(accountName, startFollower, 'blog', limit))));
    if (followers.length < limit) {
      yield put(getFollowersEnd(accountName));
      endList = true;
    }

    if (query.addMore) {
      followers = followers.slice(1);
    }

    // Get followers accounts
    if (fetchProfiles) {
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
    }
    yield put(getFollowersSuccess(accountName, followers));

    if ((limit === 1000 || limit === 1001) && endList === false) {
      yield put(getFollowersBegin(accountName, { addMore: true }, false, 0));
    }
  } catch(e) {
    yield put(getFollowersFailure(e.message));
  }
}

export default function* getFollowersManager() {
  yield takeEvery(GET_FOLLOWERS_BEGIN, getFollowers);
}
