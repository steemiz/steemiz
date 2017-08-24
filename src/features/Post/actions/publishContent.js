import { call, put, select, takeLatest } from 'redux-saga/effects';
import steem from 'steem';
import { selectMyAccount } from 'features/User/selectors';


/*--------- CONSTANTS ---------*/
const PUBLISH_CONTENT_BEGIN = 'PUBLISH_CONTENT_BEGIN';
const PUBLISH_CONTENT_SUCCESS = 'PUBLISH_CONTENT_SUCCESS';
const PUBLISH_CONTENT_FAILURE = 'PUBLISH_CONTENT_FAILURE';

/*--------- ACTIONS ---------*/
export function publishContentBegin(content) {
  return { type: PUBLISH_CONTENT_BEGIN, content };
}

export function publishContentSuccess() {
  return { type: PUBLISH_CONTENT_SUCCESS };
}

export function publishContentFailure(message) {
  return { type: PUBLISH_CONTENT_FAILURE, message };
}

/*--------- REDUCER ---------*/
export function publishContentReducer(state, action) {
  switch (action.type) {
    case PUBLISH_CONTENT_SUCCESS:
      return state
        .set('success', true);
    default:
      return state;
  }
}

/*--------- SAGAS ---------*/
function* publishContent({ content }) {
  try {
    const myAccount = yield select(selectMyAccount());
    const res = yield steem.api.broadcast.comment(

    );
  } catch (e) {

  }
}

export default function* publishContentManager() {
  yield takeLatest(PUBLISH_CONTENT_BEGIN, publishContent);
}
