import { put, select, takeEvery } from 'redux-saga/effects';
import steem from 'steem';
import steemconnect from 'utils/steemconnect';
import { selectMe } from 'features/User/selectors';

/*--------- CONSTANTS ---------*/
const VOTE_BEGIN = 'VOTE_BEGIN';
export const VOTE_OPTIMISTIC = 'VOTE_OPTIMISTIC';
export const VOTE_SUCCESS = 'VOTE_SUCCESS';
export const VOTE_FAILURE = 'VOTE_FAILURE';
export const UPDATE_PAYOUT = 'UPDATE_PAYOUT';

/*--------- ACTIONS ---------*/
export function voteBegin(content, weight, contentType, params = {}) {
  return { type: VOTE_BEGIN, content, weight, contentType, params };
}

function voteOptimistic(content, accountName, weight, params) {
  return { type: VOTE_OPTIMISTIC, content, accountName, weight, params };
}

export function voteSuccess(content, contentType) {
  return { type: VOTE_SUCCESS, content, contentType };
}

export function voteFailure(content, accountName, params, message) {
  return { type: VOTE_FAILURE, content, accountName, params, message };
}

export function updatePayout(content, contentType) {
  return { type: UPDATE_PAYOUT, content, contentType };
}

/*--------- SAGAS ---------*/
function* vote({ content, weight, contentType, params }) {
  const accountName = yield select(selectMe());
  yield put(voteOptimistic(content, accountName, weight, params));

  try {
    yield steemconnect.vote(accountName, content.author, content.permlink, weight);
    yield put(voteSuccess(content, contentType));

    // UPDATE PAYOUT
    const { author, permlink } = content;
    const updatedContent = yield steem.api.getContentAsync(author, permlink);
    yield put(updatePayout(updatedContent, contentType));

    // TEST
    /*const myAccount = yield select(selectMyAccount());
    const lastTime = Date.parse(myAccount.last_vote_time);
    console.log('lastTime', new Date(lastTime).toCustomISOString());
    const now = Date.now() - 25200000;
    console.log('now', new Date(now).toCustomISOString());
    const secondsSinceLastVote = now - lastTime;
    console.log('secondsSinceLastVote', `${now} - ${lastTime}`, secondsSinceLastVote);
    const formula = (0.995 * (myAccount.voting_power + ((100 * secondsSinceLastVote / 604800000)))) - 0.01;
    console.log('formula result', formula);
    const me = yield call(steemconnect.me);
    console.log('power updated', me.account.voting_power);*/

  } catch(e) {
    yield put(voteFailure(content, accountName, params, e.message));
  }
}

export default function* voteManager() {
  yield takeEvery(VOTE_BEGIN, vote);
}
