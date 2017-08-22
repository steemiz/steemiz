import { put, takeEvery } from 'redux-saga/effects';
import steem from 'steem';
import update from 'immutability-helper';

/*--------- CONSTANTS ---------*/
const GET_TRANSFER_HISTORY_BEGIN = 'GET_TRANSFER_HISTORY_BEGIN';
const GET_TRANSFER_HISTORY_SUCCESS = 'GET_TRANSFER_HISTORY_SUCCESS';
const GET_TRANSFER_HISTORY_FAILURE = 'GET_TRANSFER_HISTORY_FAILURE';

/*--------- ACTIONS ---------*/
export function getTransferHistoryBegin(accountName) {
  return { type: GET_TRANSFER_HISTORY_BEGIN, accountName };
}

export function getTransferHistorySuccess(accountName, history) {
  return { type: GET_TRANSFER_HISTORY_SUCCESS, accountName, history };
}

export function getTransferHistoryFailure(message) {
  return { type: GET_TRANSFER_HISTORY_FAILURE, message };
}

/*--------- REDUCER ---------*/
export function getTransferHistoryReducer(state, action) {
  switch (action.type) {
    case GET_TRANSFER_HISTORY_SUCCESS: {
      return update(state, {
        accounts: {
          [action.accountName]: {$merge: {
            transfer_history: action.history,
          }},
        },
      });
    }
    default:
      return state;
  }
}

/*--------- SAGAS ---------*/
function* getTransferHistory({ accountName }) {
  try {
    const state = yield steem.api.getStateAsync(`@${accountName}/transfers`);
    const history = state.accounts[accountName].transfer_history.reverse().map(transfer => ({
      type: transfer[1].op[0],
      timestamp: transfer[1].timestamp,
      ...transfer[1].op[1],
    }));

    yield put(getTransferHistorySuccess(accountName, history));
  } catch(e) {
    yield put(getTransferHistoryFailure(e.message));
  }
}

export default function* getTransferHistoryManager() {
  yield takeEvery(GET_TRANSFER_HISTORY_BEGIN, getTransferHistory);
}
