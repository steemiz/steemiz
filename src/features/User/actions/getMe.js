import { call, put, takeLatest } from 'redux-saga/effects';
import { setToken, removeToken } from '../../../utils/token';
import steemconnect from '../../../utils/steemconnect';

/*--------- CONSTANTS ---------*/
const GET_ME_BEGIN = 'GET_ME_BEGIN';
const GET_ME_SUCCESS = 'GET_ME_SUCCESS';
const GET_ME_FAILURE = 'GET_ME_FAILURE';

/*--------- ACTIONS ---------*/
export function getMeBegin(token) {
  return { type: GET_ME_BEGIN, token };
}

export function getMeSuccess(me) {
  return { type: GET_ME_SUCCESS, me };
}

export function getMeFailure(message) {
  return { type: GET_ME_FAILURE, message };
}

/*--------- REDUCER ---------*/
export function getMeReducer(state, action) {
  switch (action.type) {
    case GET_ME_SUCCESS:
      return {
        ...state,
        me: action.me.user,
        accounts: {
          ...action.accounts,
          [action.me.user]: action.me.account,
        }
      };
    default:
      return state;
  }
}

/*--------- SAGAS ---------*/
function* getMe({ token }) {
  steemconnect.setAccessToken(token);
  try {
    const me = yield call(steemconnect.me);
    yield put(getMeSuccess(me));
    setToken(token);
  } catch(e) {
    removeToken();
    yield put(getMeFailure(e.message));
  }
}

export default function* getMeManager() {
  yield takeLatest(GET_ME_BEGIN, getMe);
}
