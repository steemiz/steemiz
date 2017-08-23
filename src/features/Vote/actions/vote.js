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

function voteOptimistic(contentId, accountName, weight, params) {
  return { type: VOTE_OPTIMISTIC, contentId, accountName, weight, params };
}

export function voteSuccess() {
  return { type: VOTE_SUCCESS };
}

export function voteFailure(contentId, accountName, message) {
  return { type: VOTE_FAILURE, contentId, accountName, message };
}

/*--------- SAGAS ---------*/
function* vote({ content, weight, params }) {
  const accountName = yield select(selectMe());
  yield put(voteOptimistic(content.id, accountName, weight, params));

  try {
    const result = yield steemconnect.vote(accountName, content.author, content.permlink, weight);
    console.log('result', result);
    yield put(voteSuccess());
  } catch(e) {
    yield put(voteFailure(content.id, accountName, e.message));
  }
}

export default function* voteManager() {
  yield takeEvery(VOTE_BEGIN, vote);
}
