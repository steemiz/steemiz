import { call, put, select, takeEvery } from 'redux-saga/effects';
import steem from 'steem';
import update from 'immutability-helper';
import isEmpty from 'lodash/isEmpty';
import format from '../utils/format';
import { selectAccounts } from '../selectors';
import { selectAppProps } from 'features/App/selectors';

/*--------- CONSTANTS ---------*/
const GET_ACCOUNTS_BEGIN = 'GET_ACCOUNTS_BEGIN';
export const GET_ACCOUNTS_SUCCESS = 'GET_ACCOUNTS_SUCCESS';
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

    // FILTER USERS ALREADY IN STATE
    const accountsState = yield select(selectAccounts());
    const filteredRes = res.filter(account => isEmpty(accountsState[account.name]));

    const appProps = yield select(selectAppProps());
    const profiles = filteredRes.reduce((profiles, account) => {
      profiles[account.name] = format(account, appProps);
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
