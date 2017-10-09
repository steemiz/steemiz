import { call, put, select, takeLatest } from 'redux-saga/effects';
import update from 'immutability-helper';
import { setToken } from 'utils/token';
import steemconnect from 'sc2-sdk';
import format from '../utils/format';
import { selectAppProps } from 'features/App/selectors';

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
    case GET_ME_SUCCESS: {
      const { account, user } = action.me;
      return update(state, {
        me: { $set: user },
        accounts: {
          [user]: {$auto: { $merge: account }},
        },
      });
    }
    default:
      return state;
  }
}

/*--------- SAGAS ---------*/
function* getMe({ token }) {
  try {
    steemconnect.setAccessToken(token);
    const me = yield call(steemconnect.me);
    const appProps = yield select(selectAppProps());

    yield put(getMeSuccess({
      ...me,
      account: format(me.account, appProps),
    }));
    setToken(token);
  } catch(e) {
    //removeToken();
    yield put(getMeFailure(e.message));
  }
}

export default function* getMeManager() {
  yield takeLatest(GET_ME_BEGIN, getMe);
}
