import { put, select, takeLatest } from 'redux-saga/effects';
import steemconnect from 'sc2-sdk';
import update from 'immutability-helper';
import { selectMe } from '../selectors';
import { open } from 'features/Notification/actions/notification';

/*--------- CONSTANTS ---------*/
const UNFOLLOW_BEGIN = 'UNFOLLOW_BEGIN';
const UNFOLLOW_INIT = 'UNFOLLOW_INIT';
const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

/*--------- ACTIONS ---------*/
export function unfollowBegin(accountName) {
  return { type: UNFOLLOW_BEGIN, accountName };
}

export function unfollowInit(me, accountName) {
  return { type: UNFOLLOW_INIT, me, accountName };
}

export function unfollowSuccess(me, accountName) {
  return { type: UNFOLLOW_SUCCESS, me, accountName };
}

export function unfollowFailure(message) {
  return { type: UNFOLLOW_FAILURE, message };
}

/*--------- REDUCER ---------*/
export function unfollowReducer(state, action) {
  switch (action.type) {
    case UNFOLLOW_INIT: {
      const {me, accountName } = action;
      return update(state, {
        followings: {
          [me]: {
            loadStatus: {$auto: {
              [accountName]: {$set: true},
            }},
          }
        }
      });
    }
    case UNFOLLOW_SUCCESS: {
      const { me, accountName } = action;
      return update(state, {
        followings: {
          [me]: {
            list: {$apply: list => list.filter(following => following.following !== accountName)},
            loadStatus: {
              [accountName]: {$set: false},
            }
          }
        }
      });
    }
    default:
      return state;
  }
}

/*--------- SAGAS ---------*/
function* unfollow({ accountName }) {
  try {
    const me = yield select(selectMe());
    yield put(unfollowInit(me, accountName));
    yield steemconnect.unfollow(me, accountName);
    yield put(unfollowSuccess(me, accountName));
    yield put(open('success', `You are not following ${accountName} anymore.`));
  } catch (e) {
    yield put(unfollowFailure(e.message));
  }
}

export default function* unfollowManager() {
  yield takeLatest(UNFOLLOW_BEGIN, unfollow);
}
