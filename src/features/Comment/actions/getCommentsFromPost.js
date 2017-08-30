import { put, takeEvery } from 'redux-saga/effects';
import steem from 'steem';
import update from 'immutability-helper';
import { getRootCommentsList, mapCommentsBasedOnId } from '../utils/comments';
import { sortCommentsFromSteem } from 'utils/helpers/stateHelpers';

/*--------- CONSTANTS ---------*/
const GET_COMMENTS_FROM_POST_BEGIN = 'GET_COMMENTS_FROM_POST_BEGIN';
export const GET_COMMENTS_FROM_POST_SUCCESS = 'GET_COMMENTS_FROM_POST_SUCCESS';
const GET_COMMENTS_FROM_POST_FAILURE = 'GET_COMMENTS_FROM_POST_FAILURE';

/*--------- ACTIONS ---------*/
export function getCommentsFromPostBegin(category, author, permlink) {
  return { type: GET_COMMENTS_FROM_POST_BEGIN, category, author, permlink };
}

export function getCommentsFromPostSuccess(postId, state) {
  return { type: GET_COMMENTS_FROM_POST_SUCCESS, postId, state };
}

export function getCommentsFromPostFailure(message) {
  return { type: GET_COMMENTS_FROM_POST_FAILURE, message };
}

/*--------- REDUCER ---------*/
export function getCommentsFromPostReducer(state, action) {
  switch (action.type) {
    case GET_COMMENTS_FROM_POST_BEGIN: {
      return update(state, {
        isLoading: {$set: true},
      });
    }
    case GET_COMMENTS_FROM_POST_SUCCESS: {
      return update(state, {
        isLoading: {$set: false},
        commentsFromPost: {
          [action.postId]: {$auto: {
            // SORTS COMMENTS HERE TO AVOID JUMPS WHEN VOTING
            list: {$set: sortCommentsFromSteem(getRootCommentsList(action.state), mapCommentsBasedOnId(action.state.content))},
          }},
        }
      });
    }
    default:
      return state;
  }
}

/*--------- SAGAS ---------*/
function* getCommentsFromPost({ category, author, permlink }) {
  try {
    const state = yield steem.api.getStateAsync(`/${category}/@${author}/${permlink}`);
    yield put(getCommentsFromPostSuccess(`${author}/${permlink}`, state));
  } catch(e) {
    yield put(getCommentsFromPostFailure(e.message));
  }
}

export default function* getCommentsFromPostManager() {
  yield takeEvery(GET_COMMENTS_FROM_POST_BEGIN, getCommentsFromPost);
}
