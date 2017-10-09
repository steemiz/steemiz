import { call, put, takeLatest } from 'redux-saga/effects';
import update from 'immutability-helper';
import request from 'utils/request';


/*--------- CONSTANTS ---------*/
const USER_SEARCH_BEGIN = 'USER_SEARCH_BEGIN';
const USER_SEARCH_SUCCESS = 'USER_SEARCH_SUCCESS';
const USER_SEARCH_FAILURE = 'USER_SEARCH_FAILURE';

/*--------- ACTIONS ---------*/
export function userSearchBegin(q, page = 1) {
  return { type: USER_SEARCH_BEGIN, q, page };
}

export function userSearchSuccess(q, response) {
  return { type: USER_SEARCH_SUCCESS, q, response };
}

export function userSearchFailure(message) {
  return { type: USER_SEARCH_FAILURE, message };
}

/*--------- REDUCER ---------*/
export function userSearchReducer(state, action) {
  switch (action.type) {
    case USER_SEARCH_BEGIN: {
      return update(state, {
        q: {$set: ''},
        isLoading: {$set: true},
      });
    }
    case USER_SEARCH_SUCCESS: {
      const { q, response } = action;
      return update(state, {
        q: {$set: q},
        hits: {$set: response.hits},
        pages: {$set: response.pages},
        results: {$set: response.results},
        isLoading: {$set: false},
      });
    }
    default:
      return state;
  }
}

/*--------- SAGAS ---------*/
function* userSearch({ q, page }) {
  try {
    const response = yield call(request, `https://api.asksteem.com/search?q=${q}*&pg=${page}&types=user`);
    //response.results = response.results.map(result => format(result));
    yield put(userSearchSuccess(q, response));
  } catch (e) {
    yield put(userSearchFailure(e.message));
  }
}

export default function* userSearchManager() {
  yield takeLatest(USER_SEARCH_BEGIN, userSearch);
}
