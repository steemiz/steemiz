import { call, put, select, takeLatest } from 'redux-saga/effects';
import update from 'immutability-helper';
import request from 'utils/request';


/*--------- CONSTANTS ---------*/
const INIT_SEARCH = 'INIT_SEARCH';
const SEARCH_BEGIN = 'SEARCH_BEGIN';
const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
const SEARCH_FAILURE = 'SEARCH_FAILURE';

/*--------- ACTIONS ---------*/
export function initSearch() {
  return { type: INIT_SEARCH };
}

export function searchBegin(q, page = 1) {
  return { type: SEARCH_BEGIN, q, page };
}

export function searchSuccess(q, page, response) {
  return { type: SEARCH_SUCCESS, q, page, response };
}

export function searchFailure(message) {
  return { type: SEARCH_FAILURE, message };
}

/*--------- REDUCER ---------*/
export function searchReducer(state, action) {
  switch (action.type) {
    case INIT_SEARCH: {
      return update(state, {
        q: {$set: ''},
        hits: {$set: 0},
        pages: {$set: {}},
        results: {$set: []},
      });
    }
    case SEARCH_BEGIN: {
      return update(state, {
        isLoading: {$set: true},
      });
    }
    case SEARCH_SUCCESS: {
      const { q, page, response } = action;
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
function* search({ q, page }) {
  try {
    const response = yield call(request, `https://api.asksteem.com/search?q=${q}&pg=${page}`);
    yield put(searchSuccess(q, page, response));
  } catch (e) {
    yield put(searchFailure(e.message));
  }
}

export default function* searchManager() {
  yield takeLatest(SEARCH_BEGIN, search);
}
