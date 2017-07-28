import { call, put, takeLatest } from 'redux-saga/effects';
import { setToken, removeToken } from '../../../utils/token';
import steemconnect from '../../../utils/steemconnect';

/*--------- CONSTANTS ---------*/
const GET_PROFILE_BEGIN = 'GET_PROFILE_BEGIN';
const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
const GET_PROFILE_FAILURE = 'GET_PROFILE_FAILURE';

/*--------- ACTIONS ---------*/
export function getProfileBegin(token) {
  return { type: GET_PROFILE_BEGIN, token };
}

export function getProfileSuccess(profile) {
  return { type: GET_PROFILE_SUCCESS, profile };
}

export function getProfileFailure(message) {
  return { type: GET_PROFILE_FAILURE, message };
}

/*--------- REDUCER ---------*/
export function getProfileReducer(state, action) {
  switch (action.type) {
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.profile,
      };
    default:
      return state;
  }
}

/*--------- SAGAS ---------*/
function* getProfile({ token }) {
  steemconnect.setAccessToken(token);
  try {
    const res = yield call(steemconnect.me);
    yield put(getProfileSuccess(res));
    setToken(token);
  } catch(e) {
    removeToken();
    yield put(getProfileFailure(e.message));
  }
}

export default function* getProfileManager() {
  yield takeLatest(GET_PROFILE_BEGIN, getProfile);
}
