import { takeEvery, call, put, select } from 'redux-saga/effects';
import steem from 'steem';

/*--------- CONSTANTS ---------*/
const GET_VOTE_HISTORY_BEGIN = 'GET_VOTE_HISTORY_BEGIN';
const GET_VOTE_HISTORY_SUCCESS = 'GET_VOTE_HISTORY_SUCCESS';
const GET_VOTE_HISTORY_FAILURE = 'GET_VOTE_HISTORY_FAILURE';

/*--------- ACTIONS ---------*/
export function getVoteHistoryBegin(accountName) {
  return { type: GET_VOTE_HISTORY_BEGIN, accountName };
}

export function getVoteHistorySuccess(accountName, votes) {
  return { type: GET_VOTE_HISTORY_SUCCESS, accountName, votes };
}

export function getVoteHistoryFailure(message) {
  return { type: GET_VOTE_HISTORY_FAILURE, message };
}

/*--------- REDUCER ---------*/
export function getVoteHistoryReducer(state, action) {
  switch (action.type) {
    case GET_VOTE_HISTORY_SUCCESS:
      const { accountName, votes } = action;
      return {
        ...state,
        accounts: {
          ...state.accounts,
          [accountName]: {
            ...state.accounts[accountName],
            vote_history: votes,
          }
        }
      };
    default:
      return state;
  }
}

/*--------- SAGAS ---------*/
function* getVoteHistory({ accountName }) {
  try {
    const votes = yield steem.api.getAccountVotes(accountName);
    yield put(getVoteHistorySuccess(accountName, votes));
  } catch(e) {
    yield put(getVoteHistoryFailure(e.message));
  }
}

export default function* getVoteHistoryManager() {
  yield takeEvery(GET_VOTE_HISTORY_BEGIN, getVoteHistory);
}
