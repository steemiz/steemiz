import { call, put, takeLatest } from 'redux-saga/effects';
import { removeToken, getToken } from '../../../utils/token';
import steemconnect from '../../../utils/steemconnect';

/*--------- CONSTANTS ---------*/
const LOGOUT_BEGIN = 'LOGOUT_BEGIN';
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

/*--------- ACTIONS ---------*/
export function logoutBegin(token) {
  return { type: LOGOUT_BEGIN, token };
}

export function logoutSuccess(profile) {
  return { type: LOGOUT_SUCCESS, profile };
}

export function logoutFailure(message) {
  return { type: LOGOUT_FAILURE, message };
}

/*--------- REDUCER ---------*/
export function logoutReducer(state, action) {
  switch (action.type) {
    case LOGOUT_SUCCESS:
      return {
        ...state,
        profile: {},
      };
    default:
      return state;
  }
}

/*--------- SAGAS ---------*/
function* logout() {
  steemconnect.setAccessToken(getToken());
  try {
    const res = yield call(steemconnect.revokeToken);
    yield put(logoutSuccess(res));
    removeToken();
  } catch(e) {
    yield put(logoutFailure(e.message));
  }
}

export default function* logoutManager() {
  yield takeLatest(LOGOUT_BEGIN, logout);
}
