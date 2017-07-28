import { select, put, takeEvery } from 'redux-saga/effects';
import steemconnect from '../../../utils/steemconnect';
import { selectProfile } from '../../User/selectors';

/*--------- CONSTANTS ---------*/
const VOTE_BEGIN = 'VOTE_BEGIN';
const VOTE_OPTIMISTIC = 'VOTE_OPTIMISTIC';
const VOTE_SUCCESS = 'VOTE_SUCCESS';
const VOTE_FAILURE = 'VOTE_FAILURE';

/*--------- ACTIONS ---------*/
export function voteBegin(post, category, index) {
  return { type: VOTE_BEGIN, post, category, index };
}

export function voteOptimistic(category, index, voter, weight) {
  return { type: VOTE_OPTIMISTIC, category, index, voter, weight };
}

export function voteSuccess() {
  return { type: VOTE_SUCCESS };
}

export function voteFailure(category, index, user, message) {
  return { type: VOTE_FAILURE, category, index, user, message };
}

/*--------- REDUCER ---------*/
export function voteReducer(state, action) {
  switch (action.type) {
    case VOTE_OPTIMISTIC: {
      const { category, index, voter, weight } = action;
      const newPosts = state[category];
      newPosts[index].active_votes.push({
        voter: voter,
        percent: weight,
      });
      return {
        ...state,
        [category]: newPosts,
      };
    }
    case VOTE_FAILURE: {
      const { category, index, user } = action;
      const newPosts = state[category];
      newPosts[index].active_votes = newPosts[index].active_votes.filter(vote => vote.voter !== user);
      return {
        ...state,
        [category]: newPosts,
      };
    }
    default:
      return state;
  }
}

/*--------- SAGAS ---------*/
function* vote({ post, category, index }) {
  const profile = yield select(selectProfile());
  const { user, account: { voting_power }} = profile;

  yield put(voteOptimistic(category, index, user, voting_power * 100));
  try {
    const result = yield steemconnect.vote(user, post.author, post.permlink, voting_power);
    console.log('vote result', result);
    yield put(voteSuccess());
  } catch(e) {
    yield put(voteFailure(category, index, user, e.message));
  }
}

export default function* voteManager() {
  yield takeEvery(VOTE_BEGIN, vote);
}
