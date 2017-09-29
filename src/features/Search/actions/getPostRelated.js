import { call, put, select, takeLatest } from 'redux-saga/effects';
import update from 'immutability-helper';
import request from 'utils/request';
import format from '../utils/format';


/*--------- CONSTANTS ---------*/
const GET_POST_RELATED_BEGIN = 'GET_POST_RELATED_BEGIN';
const GET_POST_RELATED_SUCCESS = 'GET_POST_RELATED_SUCCESS';
const GET_POST_RELATED_FAILURE = 'GET_POST_RELATED_FAILURE';

/*--------- ACTIONS ---------*/
export function getPostRelatedBegin(author, permlink) {
  return { type: GET_POST_RELATED_BEGIN, author, permlink };
}

export function getPostRelatedSuccess(author, permlink, response) {
  return { type: GET_POST_RELATED_SUCCESS, author, permlink, response };
}

export function getPostRelatedFailure(message) {
  return { type: GET_POST_RELATED_FAILURE, message };
}

/*--------- REDUCER ---------*/
export function getPostRelatedReducer(state, action) {
  switch (action.type) {
    case GET_POST_RELATED_SUCCESS: {
      const { author, permlink, response } = action;
      return update(state, {
        [`${author}/${permlink}`]: {$auto: {$set:
          response.results
        }},
      });
    }
    default:
      return state;
  }
}

/*--------- SAGAS ---------*/
function* getPostRelated({ author, permlink }) {
  try {
    const response = yield call(request, `https://api.asksteem.com/related?author=${author}&permlink=${permlink}&include=meta,pending_payout_value,curator_payout_value,total_payout_value,author_reputation`);
    console.log('response', response);
    response.results = response.results.map(result => format(result));
    yield put(getPostRelatedSuccess(author, permlink, response));
  } catch (e) {
    yield put(getPostRelatedFailure(e.message));
  }
}

export default function* getPostRelatedManager() {
  yield takeLatest(GET_POST_RELATED_BEGIN, getPostRelated);
}
