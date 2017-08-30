import { put, select, takeEvery } from 'redux-saga/effects';
import steemconnect from 'utils/steemconnect';
import { selectMe } from 'features/User/selectors';

/*--------- CONSTANTS ---------*/
const VOTE_BEGIN = 'VOTE_BEGIN';
export const VOTE_OPTIMISTIC = 'VOTE_OPTIMISTIC';
export const VOTE_SUCCESS = 'VOTE_SUCCESS';
export const VOTE_FAILURE = 'VOTE_FAILURE';

/*--------- ACTIONS ---------*/
export function voteBegin(content, weight, params = {}) {
  return { type: VOTE_BEGIN, content, weight, params };
}

function voteOptimistic(content, accountName, weight, params) {
  return { type: VOTE_OPTIMISTIC, content, accountName, weight, params };
}

export function voteSuccess() {
  return { type: VOTE_SUCCESS };
}

export function voteFailure(content, accountName, params, message) {
  return { type: VOTE_FAILURE, content, accountName, params, message };
}

/*--------- SAGAS ---------*/
function* vote({ content, weight, params }) {
  const accountName = yield select(selectMe());
  yield put(voteOptimistic(content, accountName, weight, params));

  try {
    const result = yield steemconnect.vote(accountName, content.author, content.permlink, weight);
    yield put(voteSuccess());
  } catch(e) {
    yield put(voteFailure(content, accountName, params, e.message));
  }
}

export default function* voteManager() {
  yield takeEvery(VOTE_BEGIN, vote);
}
