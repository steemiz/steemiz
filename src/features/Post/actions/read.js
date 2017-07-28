import { select, put, takeEvery } from 'redux-saga/effects';
import steemconnect from '../../../utils/steemconnect';
import { selectProfile } from '../../User/selectors';

/*--------- CONSTANTS ---------*/
const READ_BEGIN = 'READ_BEGIN';
const READ_SUCCESS = 'READ_SUCCESS';
const READ_FAILURE = 'READ_FAILURE';

/*--------- ACTIONS ---------*/
export function readBegin(post) {
  return { type: READ_BEGIN, post };
}

export function readSuccess() {
  return { type: READ_SUCCESS };
}

export function readFailure(message) {
  return { type: READ_FAILURE, message };
}

/*--------- REDUCER ---------*/
export function readReducer(state, action) {
  switch (action.type) {
    default:
      return state;
  }
}

/*--------- SAGAS ---------*/
function* read({ post }) {
  const profile = yield select(selectProfile());
  try {
    const result = yield steemconnect.read(profile.user, post.author, post.permlink, profile.account.voting_power);
    console.log('read result', result);
    yield put(readSuccess());
  } catch(e) {
    yield put(readFailure(e.message));
  }
}

export default function* readManager() {
  yield takeEvery(READ_BEGIN, read);
}
