import { select, put, takeEvery } from 'redux-saga/effects';
import steemconnect from '../../../utils/steemconnect';
import { selectMe } from '../../User/selectors';

/*--------- CONSTANTS ---------*/
const VOTE_BEGIN = 'VOTE_BEGIN';
export const VOTE_OPTIMISTIC = 'VOTE_OPTIMISTIC';
export const VOTE_SUCCESS = 'VOTE_SUCCESS';
export const VOTE_FAILURE = 'VOTE_FAILURE';

/*--------- ACTIONS ---------*/
export function voteBegin(post, weight, params = {}) {
  return { type: VOTE_BEGIN, post, weight, params };
}

function voteOptimistic(postId, accountName, weight, params) {
  return { type: VOTE_OPTIMISTIC, postId, accountName, weight, params };
}

export function voteSuccess() {
  return { type: VOTE_SUCCESS };
}

export function voteFailure(category, index, user, message) {
  return { type: VOTE_FAILURE, category, index, user, message };
}

/*--------- SAGAS ---------*/
function* vote({ post, weight, params }) {
  const accountName = yield select(selectMe());
  yield put(voteOptimistic(post.id, accountName, weight, params));

  try {
    const result = yield steemconnect.vote(accountName, post.author, post.permlink, weight);
    yield put(voteSuccess());
  } catch(e) {
    yield put(voteFailure(params.category, params.index, accountName, e.message));
  }
}

export default function* voteManager() {
  yield takeEvery(VOTE_BEGIN, vote);
}
