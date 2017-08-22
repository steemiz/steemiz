import { call, put, takeEvery } from 'redux-saga/effects';
import steem from 'steem';
import update from 'immutability-helper';

/*--------- CONSTANTS ---------*/
const GET_ACCOUNTS_BEGIN = 'GET_ACCOUNTS_BEGIN';
const GET_ACCOUNTS_SUCCESS = 'GET_ACCOUNTS_SUCCESS';
const GET_ACCOUNTS_FAILURE = 'GET_ACCOUNTS_FAILURE';

/*--------- ACTIONS ---------*/
/**
 * @param accounts: Array of accounts name
 * @returns {{type: string, accounts: *}}
 */
export function getAccountsBegin(accounts) {
  return { type: GET_ACCOUNTS_BEGIN, accounts };
}

export function getAccountsSuccess(profiles) {
  return { type: GET_ACCOUNTS_SUCCESS, profiles };
}

export function getAccountsFailure(message) {
  return { type: GET_ACCOUNTS_FAILURE, message };
}

/*--------- REDUCER ---------*/
export function getAccountsReducer(state, action) {
  switch (action.type) {
    case GET_ACCOUNTS_SUCCESS: {
      const { profiles } = action;
      return update(state, {
        accounts: { $merge: profiles },
      });
    }
    default:
      return state;
  }
}

/*--------- SAGAS ---------*/
function* getAccounts({ accounts }) {
  try {
    const res = yield call(() => new Promise(resolve => resolve(steem.api.getAccountsAsync(accounts))));
    const profiles = res.reduce((profiles, account) => {
      profiles[account.name] = account;
      return profiles;
    }, {});
    yield put(getAccountsSuccess(profiles));
  } catch(e) {
    yield put(getAccountsFailure(e.message));
  }
}

export default function* getAccountsManager() {
  yield takeEvery(GET_ACCOUNTS_BEGIN, getAccounts);
}
