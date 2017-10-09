import { put, select, takeEvery } from 'redux-saga/effects';
import steem from 'steem';
import update from 'immutability-helper';
import isEmpty from 'lodash/isEmpty';
import { selectLastObjectRepliesToUser } from '../selectors';
import { getRootCommentsList, mapCommentsBasedOnId } from '../utils/comments';
import { sortCommentsFromSteem } from 'utils/helpers/stateHelpers';

/*--------- CONSTANTS ---------*/
const GET_REPLIES_TO_USER_BEGIN = 'GET_REPLIES_TO_USER_BEGIN';
export const GET_REPLIES_TO_USER_SUCCESS = 'GET_REPLIES_TO_USER_SUCCESS';
const GET_REPLIES_TO_USER_FAILURE = 'GET_REPLIES_TO_USER_FAILURE';
const ADD_REPLIES_TO_USER_SUCCESS = 'ADD_REPLIES_TO_USER_SUCCESS';

/*--------- ACTIONS ---------*/
export function getRepliesToUserBegin(accountName, query = {}) {
  return { type: GET_REPLIES_TO_USER_BEGIN, accountName, query };
}

export function getRepliesToUserSuccess(accountName, state) {
  return { type: GET_REPLIES_TO_USER_SUCCESS, accountName, state };
}

export function addRepliesToUserSuccess(accountName, comments) {
  return { type: ADD_REPLIES_TO_USER_SUCCESS, accountName, comments };
}

export function getRepliesToUserFailure(message) {
  return { type: GET_REPLIES_TO_USER_FAILURE, message };
}

/*--------- REDUCER ---------*/
export function getRepliesToUserReducer(state, action) {
  switch (action.type) {
    case GET_REPLIES_TO_USER_BEGIN: {
      return update(state, {
        repliesToUser: {
          [action.accountName]: {$auto: {
            list: {$autoArray: {}},
            hasMore: {$set: true},
            isLoading: {$set: true},
          }},
        },
      });
    }
    case GET_REPLIES_TO_USER_SUCCESS: {
      return update(state, {
        repliesToUser: {
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
    case ADD_REPLIES_TO_USER_SUCCESS: {
      const { comments, accountName } = action;
      const hasMore = !(comments.length < 10);
      const commentsObject = {};
      comments.forEach(comment => {
        commentsObject[comment.id] = comment;
      });
      return update(state, {
        repliesToUser: {
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
function* getRepliesToUser({ accountName, query }) {
  try {
    if (isEmpty(query)) {
      // INIT REPLIES
      const state = yield steem.api.getStateAsync(`@${accountName}/recent-replies`);
      yield put(getRepliesToUserSuccess(accountName, state));
    } else if (query.addMore) {
      // ADD MORE REPLIES
      const lastReply = yield select(selectLastObjectRepliesToUser(accountName));
      const comments = yield steem.api.getRepliesByLastUpdateAsync(lastReply.author, lastReply.permlink, 11);
      yield put(addRepliesToUserSuccess(accountName, comments.slice(1)));
    }
  } catch(e) {
    yield put(getRepliesToUserFailure(e.message));
  }
}

export default function* getRepliesToUserManager() {
  yield takeEvery(GET_REPLIES_TO_USER_BEGIN, getRepliesToUser);
}
