import { select, put, takeEvery } from 'redux-saga/effects';
import steemconnect from '../../../utils/steemconnect';
import { selectUsername } from '../../User/selectors';

/*--------- CONSTANTS ---------*/
const VOTE_BEGIN = 'VOTE_BEGIN';
export const VOTE_OPTIMISTIC = 'VOTE_OPTIMISTIC';
export const VOTE_SUCCESS = 'VOTE_SUCCESS';
export const VOTE_FAILURE = 'VOTE_FAILURE';

/*--------- ACTIONS ---------*/
export function voteBegin(post, weight, params = {}) {
  return { type: VOTE_BEGIN, post, weight, params };
}

function voteOptimistic(postId, username, weight, params) {
  return { type: VOTE_OPTIMISTIC, postId, username, weight, params };
}

export function voteSuccess() {
  return { type: VOTE_SUCCESS };
}

export function voteFailure(category, index, user, message) {
  return { type: VOTE_FAILURE, category, index, user, message };
}

/*--------- SAGAS ---------*/
function* vote({ post, weight, params }) {
  const username = yield select(selectUsername());
  yield put(voteOptimistic(post.id, username, weight, params));

  try {
    /*const result = yield steemconnect.vote(user, post.author, post.permlink, weight);
    console.log('vote result', result);*/
    yield put(voteSuccess());
  } catch(e) {
    yield put(voteFailure(params.category, params.index, username, e.message));
  }
}

export default function* voteManager() {
  yield takeEvery(VOTE_BEGIN, vote);
}
