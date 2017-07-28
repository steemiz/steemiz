import { select, put, takeEvery } from 'redux-saga/effects';
import steemconnect from '../../../utils/steemconnect';
import { selectProfile } from '../../User/selectors';

/*--------- CONSTANTS ---------*/
const VOTE_BEGIN = 'VOTE_BEGIN';
const VOTE_SUCCESS = 'VOTE_SUCCESS';
const VOTE_FAILURE = 'VOTE_FAILURE';

/*--------- ACTIONS ---------*/
export function voteBegin(post) {
  return { type: VOTE_BEGIN, post };
}

export function voteSuccess() {
  return { type: VOTE_SUCCESS };
}

export function voteFailure(message) {
  return { type: VOTE_FAILURE, message };
}

/*--------- REDUCER ---------*/
export function voteReducer(state, action) {
  switch (action.type) {
    default:
      return state;
  }
}

/*--------- SAGAS ---------*/
function* vote({ post }) {
  const profile = yield select(selectProfile());
  try {
    const result = yield steemconnect.vote(profile.user, post.author, post.permlink, profile.account.voting_power);
    console.log('vote result', result);
    yield put(voteSuccess());
  } catch(e) {
    yield put(voteFailure(e.message));
  }
}

export default function* voteManager() {
  yield takeEvery(VOTE_BEGIN, vote);
}
