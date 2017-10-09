import { call, put, takeLatest } from 'redux-saga/effects';
import update from 'immutability-helper';
import request from 'utils/request';


/*--------- CONSTANTS ---------*/
const SUGGEST_BEGIN = 'SUGGEST_BEGIN';
const SUGGEST_SUCCESS = 'SUGGEST_SUCCESS';
const SUGGEST_FAILURE = 'SUGGEST_FAILURE';

/*--------- ACTIONS ---------*/
export function suggestBegin(term) {
  return { type: SUGGEST_BEGIN, term };
}

export function suggestSuccess(term, suggestions) {
  return { type: SUGGEST_SUCCESS, term, suggestions };
}

export function suggestFailure(message) {
  return { type: SUGGEST_FAILURE, message };
}

/*--------- REDUCER ---------*/
export function suggestReducer(state, action) {
  switch (action.type) {
    case SUGGEST_BEGIN: {
      return update(state, {
        isLoading: {$set: true},
        term: {$set: action.term},
      });
    }
    case SUGGEST_SUCCESS: {
      const { suggestions } = action;
      return update(state, {
        suggestions: {$set: suggestions},
        isLoading: {$set: false},
      });
    }
    default:
      return state;
  }
}

/*--------- SAGAS ---------*/
function* suggest({ term }) {
  try {
    const suggestions = yield call(request, `https://api.asksteem.com/suggestions?term=${term}`);
    yield put(suggestSuccess(term, suggestions));
  } catch (e) {
    yield put(suggestFailure(e.message));
  }
}

export default function* suggestManager() {
  yield takeLatest(SUGGEST_BEGIN, suggest);
}
