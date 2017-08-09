import { call, put, takeEvery } from 'redux-saga/effects';
import steem from 'steem';
import { getRootCommentsList, mapCommentsBasedOnId } from '../utils/comments';
import { sortCommentsFromSteem } from '../../../utils/helpers/stateHelpers';

/*--------- CONSTANTS ---------*/
const GET_COMMENTS_FROM_POST_BEGIN = 'GET_COMMENTS_FROM_POST_BEGIN';
export const GET_COMMENTS_FROM_POST_SUCCESS = 'GET_COMMENTS_FROM_POST_SUCCESS';
const GET_COMMENTS_FROM_POST_FAILURE = 'GET_COMMENTS_FROM_POST_FAILURE';

/*--------- ACTIONS ---------*/
export function getCommentsFromPostBegin(post) {
  return { type: GET_COMMENTS_FROM_POST_BEGIN, post };
}

export function getCommentsFromPostSuccess(post, state) {
  return { type: GET_COMMENTS_FROM_POST_SUCCESS, post, state };
}

export function getCommentsFromPostFailure(message) {
  return { type: GET_COMMENTS_FROM_POST_FAILURE, message };
}

/*--------- REDUCER ---------*/
export function getCommentsFromPostReducer(state, action) {
  switch (action.type) {
    case GET_COMMENTS_FROM_POST_SUCCESS: {
      return {
        ...state,
        commentsByPost: {
          ...state.commentsByPost,
          [action.post.id]: {
            // SORTS COMMENTS HERE TO AVOID JUMPS WHEN VOTING
            list: sortCommentsFromSteem(getRootCommentsList(action.state), { commentsData: mapCommentsBasedOnId(action.state.content)}),
          },
        },
      }
    }
    default:
      return state;
  }
}

/*--------- SAGAS ---------*/
function* getCommentsFromPost({ post }) {
  const { category, author, permlink } = post;
  try {
    const state = yield steem.api.getStateAsync(`/${category}/@${author}/${permlink}`);
    yield put(getCommentsFromPostSuccess(post, state));
  } catch(e) {
    yield put(getCommentsFromPostFailure(e.message));
  }
}

export default function* getCommentsFromPostManager() {
  yield takeEvery(GET_COMMENTS_FROM_POST_BEGIN, getCommentsFromPost);
}
