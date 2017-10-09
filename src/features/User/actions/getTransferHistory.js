import { put, select, takeEvery } from 'redux-saga/effects';
import steem from 'steem';
import update from 'immutability-helper';
import { selectHistoryTransferList } from '../selectors';

/*--------- CONSTANTS ---------*/
const GET_TRANSFER_HISTORY_BEGIN = 'GET_TRANSFER_HISTORY_BEGIN';
const GET_TRANSFER_HISTORY_SUCCESS = 'GET_TRANSFER_HISTORY_SUCCESS';
const GET_TRANSFER_HISTORY_FAILURE = 'GET_TRANSFER_HISTORY_FAILURE';
const GET_TRANSFER_HISTORY_END = 'GET_TRANSFER_HISTORY_END';

/*--------- ACTIONS ---------*/
export function getTransferHistoryBegin(accountName) {
  return { type: GET_TRANSFER_HISTORY_BEGIN, accountName };
}

export function getTransferHistorySuccess(accountName, history) {
  return { type: GET_TRANSFER_HISTORY_SUCCESS, accountName, history };
}

export function getTransferHistoryEnd(accountName) {
  return { type: GET_TRANSFER_HISTORY_END, accountName };
}

export function getTransferHistoryFailure(message) {
  return { type: GET_TRANSFER_HISTORY_FAILURE, message };
}

/*--------- REDUCER ---------*/
export function getTransferHistoryReducer(state, action) {
  switch (action.type) {
    case GET_TRANSFER_HISTORY_BEGIN: {
      return update(state, {
        accounts: {
          [action.accountName]: {$auto: {
            history_transfer: {$auto: {
              list: {$autoArray: {}},
              isLoading: {$set: true},
              hasMore: {$set: true},
            }},
          }},
        }
      });
    }
    case GET_TRANSFER_HISTORY_SUCCESS: {
      return update(state, {
        accounts: {
          [action.accountName]: {
            history_transfer: {
              list: {$push: action.history},
              isLoading: {$set: false},
            },
          },
        },
      });
    }
    case GET_TRANSFER_HISTORY_END: {
      return update(state, {
        accounts: {
          [action.accountName]: {
            history_transfer: {
              hasMore: {$set: false},
            },
          },
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
    const transferList = yield select(selectHistoryTransferList(accountName));

    // SELECT LAST TRANSFER FROM LIST
    // OF TYPE DIFFERENT THAN 'custom_json'
    let lastIndex = transferList.length - 1;
    let lastTransfer = transferList.length ? transferList[lastIndex] : {};
    while(lastTransfer.type === 'custom_json') {
      lastIndex--;
      lastTransfer =  transferList[lastIndex];
    }

    const from = lastTransfer.id || -1;

    // LIMIT CANNOT BE > FROM
    let limit = 100;
    if (from !== -1 && from < 100) {
      limit = from;
      yield put(getTransferHistoryEnd(accountName));
    }
    const state = yield steem.api.getAccountHistory(accountName, from, limit);
    const history = state.reverse().map(transfer => ({
      type: transfer[1].op[0],
      timestamp: transfer[1].timestamp,
      id: transfer[0],
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
