import { select, put, takeEvery } from 'redux-saga/effects';
import steem from 'steem';
import update from 'immutability-helper';
import isEmpty from 'lodash/isEmpty';

import format from '../utils/format';
import getPostKey from '../utils/postKey';
import { selectPostByPermlink } from '../selectors';

/*--------- CONSTANTS ---------*/
const GET_ONE_POST_BEGIN = 'GET_ONE_POST_BEGIN';
const GET_ONE_POST_SUCCESS = 'GET_ONE_POST_SUCCESS';
const GET_ONE_POST_FAILURE = 'GET_ONE_POST_FAILURE';
const SET_CURRENT_POST_ID = 'SET_CURRENT_POST_ID';
const GET_ONE_POST_ALREADY_IN_STATE = 'GET_ONE_POST_ALREADY_IN_STATE';

/*--------- ACTIONS ---------*/
export function getOnePostBegin(author, permlink) {
  return { type: GET_ONE_POST_BEGIN, author, permlink };
}

export function getOnePostSuccess(post) {
  return { type: GET_ONE_POST_SUCCESS, post };
}

export function getOnePostFailure(message) {
  return { type: GET_ONE_POST_FAILURE, message };
}

export function setCurrentPostPermlink(id) {
  return { type: SET_CURRENT_POST_ID, id };
}

export function getOnePostAlreadyInState() {
  return { type: GET_ONE_POST_ALREADY_IN_STATE };
}

/*--------- REDUCER ---------*/
export function getOnePostReducer(state, action) {
  switch (action.type) {
    case GET_ONE_POST_SUCCESS: {
      const { post } = action;
      return update(state, {
        posts: {$merge: {
          [getPostKey(post)]: post,
        }},
      });
    }
    case SET_CURRENT_POST_ID: {
      return {
        ...state,
        currentPostId: action.id,
      }
    }
    default:
      return state;
  }
}

/*--------- SAGAS ---------*/
function* getOnePost({ author, permlink }) {
  try {
    const postByPermlink = yield select(selectPostByPermlink(author, permlink));
    yield put(setCurrentPostPermlink(`${author}/${permlink}`));

    if (isEmpty(postByPermlink)) {
      const post = yield steem.api.getContentAsync(author, permlink);
      yield put(getOnePostSuccess(format(post)));
    } else {
      yield put(getOnePostAlreadyInState());
    }
  } catch(e) {
    yield put(getOnePostFailure(e.message));
  }
}

export default function* getOnePostManager() {
  yield takeEvery(GET_ONE_POST_BEGIN, getOnePost);
}
