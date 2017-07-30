import { call, put, takeEvery } from 'redux-saga/effects';
import steem from 'steem';
import { getCommentsChildrenLists, getRootCommentsList, mapCommentsBasedOnId } from '../utils/comments';

/*--------- CONSTANTS ---------*/
const GET_COMMENTS_BEGIN = 'GET_COMMENTS_BEGIN';
const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS';
const GET_COMMENTS_FAILURE = 'GET_COMMENTS_FAILURE';
const CLEAR_COMMENTS = 'CLEAR_COMMENTS';

/*--------- ACTIONS ---------*/
export function getCommentsBegin(post) {
  return { type: GET_COMMENTS_BEGIN, post };
}

export function getCommentsSuccess(state) {
  return { type: GET_COMMENTS_SUCCESS, state };
}

export function getCommentsFailure(message) {
  return { type: GET_COMMENTS_FAILURE, message };
}

export function clearComments() {
  return { type: CLEAR_COMMENTS };
}

/*--------- REDUCER ---------*/
export function getCommentsReducer(state, action) {
  switch (action.type) {
    case GET_COMMENTS_SUCCESS: {
      return {
        commentsRoots: getRootCommentsList(action.state),
        commentsChild: getCommentsChildrenLists(action.state),
        commentsData: mapCommentsBasedOnId(action.state.content),
      }
    }
    case CLEAR_COMMENTS: {
      return {
        commentsRoots: [],
        commentsChild: {},
        commentsData: {},
      }
    }
    default:
      return state;
  }
}

/*--------- SAGAS ---------*/
function* getComments({ post }) {
  const { category, author, permlink } = post;
  try {
    const state = yield steem.api.getStateAsync(`/${category}/@${author}/${permlink}`);
    yield put(getCommentsSuccess(state));
  } catch(e) {
    yield put(getCommentsFailure(e.message));
  }
}

export default function* getCommentsManager() {
  yield takeEvery(GET_COMMENTS_BEGIN, getComments);
}
