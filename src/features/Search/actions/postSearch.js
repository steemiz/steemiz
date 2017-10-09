import { call, put, takeLatest } from 'redux-saga/effects';
import update from 'immutability-helper';
import request from 'utils/request';
import format from '../utils/format';


/*--------- CONSTANTS ---------*/
const POST_SEARCH_INIT = 'POST_SEARCH_INIT';
const POST_SEARCH_BEGIN = 'POST_SEARCH_BEGIN';
const POST_SEARCH_SUCCESS = 'POST_SEARCH_SUCCESS';
const POST_SEARCH_FAILURE = 'POST_SEARCH_FAILURE';

/*--------- ACTIONS ---------*/
export function postSearchInit() {
  return { type: POST_SEARCH_INIT };
}

export function postSearchBegin(q, page = 1) {
  return { type: POST_SEARCH_BEGIN, q, page };
}

export function postSearchSuccess(q, response) {
  return { type: POST_SEARCH_SUCCESS, q, response };
}

export function postSearchFailure(message) {
  return { type: POST_SEARCH_FAILURE, message };
}

/*--------- REDUCER ---------*/
export function postSearchReducer(state, action) {
  switch (action.type) {
    case POST_SEARCH_INIT: {
      return update(state, {
        q: {$set: ''},
        hits: {$set: undefined},
        pages: {$set: {}},
        results: {$set: []},
      });
    }
    case POST_SEARCH_BEGIN: {
      return update(state, {
        isLoading: {$set: true},
      });
    }
    case POST_SEARCH_SUCCESS: {
      const { q, response } = action;
      return update(state, {
        q: {$set: q},
        hits: {$set: response.hits},
        pages: {$set: response.pages},
        results: {$push: response.results},
        isLoading: {$set: false},
      });
    }
    default:
      return state;
  }
}

/*--------- SAGAS ---------*/
function* postSearch({ q, page }) {
  try {
    const response = yield call(request, `https://api.asksteem.com/search?q=${q}&pg=${page}&include=meta,pending_payout_value,curator_payout_value,total_payout_value,author_reputation,active_votes`);
    response.results = response.results.map(result => format(result));
    yield put(postSearchSuccess(q, response));
  } catch (e) {
    yield put(postSearchFailure(e.message));
  }
}

export default function* postSearchManager() {
  yield takeLatest(POST_SEARCH_BEGIN, postSearch);
}
