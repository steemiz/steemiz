import { call, put, select, takeLatest } from 'redux-saga/effects';
import update from 'immutability-helper';
import isEmpty from 'lodash/isEmpty';
import { selectCurrentAccount } from '../selectors';
import { getAccountsBegin } from './getAccounts';

/*--------- CONSTANTS ---------*/
const SET_CURRENT_USER_BEGIN = 'SET_CURRENT_USER_BEGIN';
const SET_CURRENT_USER_SUCCESS = 'SET_CURRENT_USER_SUCCESS';
const SET_CURRENT_USER_FAILURE = 'SET_CURRENT_USER_FAILURE';

/*--------- ACTIONS ---------*/
export function setCurrentUserBegin(user) {
  return { type: SET_CURRENT_USER_BEGIN, user };
}

export function setCurrentUserSuccess(user) {
  return { type: SET_CURRENT_USER_SUCCESS, user };
}

export function setCurrentUserFailure(message) {
  return { type: SET_CURRENT_USER_FAILURE, message };
}

/*--------- REDUCER ---------*/
export function setCurrentUserReducer(state, action) {
  switch (action.type) {
    case SET_CURRENT_USER_SUCCESS:
      return update(state, {
        currentUser: {$set: action.user},
      });
    default:
      return state;
  }
}

/*--------- SAGAS ---------*/
function* setCurrentUser({ user }) {
  try {
    const currentAccount = yield select(selectCurrentAccount());
    if (isEmpty(currentAccount)) {
      yield put(getAccountsBegin([user]));
    }
    yield put(setCurrentUserSuccess(user));
  } catch (e) {

  }
}

export default function* setCurrentUserManager() {
  yield takeLatest(SET_CURRENT_USER_BEGIN, setCurrentUser);
}
