import { put, select, takeEvery } from 'redux-saga/effects';
import steem from 'steem';
import update from 'immutability-helper';
import isEmpty from 'lodash/isEmpty';
import { selectLastPermlinkCommentsFromUser } from '../selectors';
import { getRootCommentsList, mapCommentsBasedOnId } from '../utils/comments';
import { sortCommentsFromSteem } from 'utils/helpers/stateHelpers';

/*--------- CONSTANTS ---------*/
const GET_COMMENTS_FROM_USER_BEGIN = 'GET_COMMENTS_FROM_USER_BEGIN';
export const GET_COMMENTS_FROM_USER_SUCCESS = 'GET_COMMENTS_FROM_USER_SUCCESS';
const GET_COMMENTS_FROM_USER_FAILURE = 'GET_COMMENTS_FROM_USER_FAILURE';
const ADD_COMMENTS_FROM_USER_SUCCESS = 'ADD_COMMENTS_FROM_USER_SUCCESS';

/*--------- ACTIONS ---------*/
export function getCommentsFromUserBegin(accountName, query = {}) {
  return { type: GET_COMMENTS_FROM_USER_BEGIN, accountName, query };
}

export function getCommentsFromUserSuccess(accountName, state) {
  return { type: GET_COMMENTS_FROM_USER_SUCCESS, accountName, state };
}

export function addCommentsFromUserSuccess(accountName, comments) {
  return { type: ADD_COMMENTS_FROM_USER_SUCCESS, accountName, comments };
}

export function getCommentsFromUserFailure(message) {
  return { type: GET_COMMENTS_FROM_USER_FAILURE, message };
}

/*--------- REDUCER ---------*/
export function getCommentsFromUserReducer(state, action) {
  switch (action.type) {
    case GET_COMMENTS_FROM_USER_BEGIN: {
      return update(state, {
        commentsFromUser: {
          [action.accountName]: {$auto: {
            list: {$autoArray: {}},
            hasMore: {$set: true},
            isLoading: {$set: true},
          }},
        },
      });
    }
    case GET_COMMENTS_FROM_USER_SUCCESS: {
      return update(state, {
        commentsFromUser: {
          [action.accountName]: {
            list: {$push: sortCommentsFromSteem(
              getRootCommentsList(action.state),
              mapCommentsBasedOnId(action.state.content),
              'new',
            )},
            isLoading: {$set: false},
          },
        },
      });
    }
    case ADD_COMMENTS_FROM_USER_SUCCESS: {
      const { comments, accountName } = action;
      const hasMore = !(comments.length < 10);
      const commentsObject = {};
      comments.forEach(comment => {
        commentsObject[comment.id] = comment;
      });
      return update(state, {
        commentsFromUser: {
          [accountName]: {
            list: {$push: comments.map(comment => comment.id)},
            isLoading: {$set: false},
            hasMore: {$set: hasMore},
          },
        },
        commentsData: {$merge: commentsObject},
      });
    }
    default:
      return state;
  }
}

/*--------- SAGAS ---------*/
function* getCommentsFromUser({ accountName, query }) {
  try {
    if (isEmpty(query)) {
      // INIT COMMENTS
      const state = yield steem.api.getStateAsync(`@${accountName}/comments`);
      yield put(getCommentsFromUserSuccess(accountName, state));
    } else if (query.addMore) {
      // ADD MORE COMMENTS
      const permlink = yield select(selectLastPermlinkCommentsFromUser(accountName));
      const comments = yield steem.api.getDiscussionsByComments({
        start_author: accountName,
        start_permlink: permlink,
        limit: 11
      });
      yield put(addCommentsFromUserSuccess(accountName, comments.slice(1)));
    }
  } catch(e) {
    yield put(getCommentsFromUserFailure(e.message));
  }
}

export default function* getCommentsFromUserManager() {
  yield takeEvery(GET_COMMENTS_FROM_USER_BEGIN, getCommentsFromUser);
}
