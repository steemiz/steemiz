import { call, put, select, takeLatest } from 'redux-saga/effects';
import update from 'immutability-helper';
import draftToHtml from 'draftjs-to-html';
import kebabCase from 'lodash/kebabCase';

import { getToken, removeToken } from 'utils/token';
import steemconnect from 'utils/steemconnect';
import { selectMyAccount } from 'features/User/selectors';
import { open } from 'features/Notification/actions/notification';


/*--------- CONSTANTS ---------*/
const TOGGLE_PUBLISH_FORM = 'TOGGLE_PUBLISH_FORM';
const PUBLISH_CONTENT_BEGIN = 'PUBLISH_CONTENT_BEGIN';
const PUBLISH_CONTENT_SUCCESS = 'PUBLISH_CONTENT_SUCCESS';
const PUBLISH_CONTENT_FAILURE = 'PUBLISH_CONTENT_FAILURE';

/*--------- ACTIONS ---------*/
export function togglePublishForm() {
  return { type: TOGGLE_PUBLISH_FORM };
}

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
    case PUBLISH_CONTENT_BEGIN: {
      return update(state, {
        isPublishing: {$set: true},
      });
    }
    case PUBLISH_CONTENT_SUCCESS: {
      return update(state, {
        isPublishing: {$set: false},
        publishFormOpen: {$set: false},
      });
    }
    case TOGGLE_PUBLISH_FORM: {
      const newPublishFormOpen = !state.publishFormOpen;
      return update(state, {
        publishFormOpen: {$set: newPublishFormOpen},
        isPublishing: {$apply: isPublishing => {
          if (isPublishing === true && newPublishFormOpen === false) {
            return false;
          }
          return isPublishing;
        }}
      });
    }
    default:
      return state;
  }
}

/*--------- SAGAS ---------*/
/**
 * @param content: { title: string, tags: array, editorRaw }
 */
function* publishContent({ content }) {
  try {
    steemconnect.setAccessToken(getToken());
    const myAccount = yield select(selectMyAccount());
    const { title, tags, editorRaw } = content;
    const metadata = {
      app: 'steemiz',
    };

    // LISTING IMAGES AND LINKS
    const images = [];
    const links = [];
    Object.values(editorRaw.entityMap).forEach(entity => {
      if (entity.type === 'IMAGE') {
        images.push(entity.data.src);
      }
      if (entity.type === 'LINK') {
        links.push(entity.data.url);
      }
    });

    if (tags.length) { metadata.tags = tags; }
    if (links.length) { metadata.links = links; }
    if (images.length) { metadata.image = images; }

    const res = yield call(() => steemconnect.comment(
      '', // parent_author
      tags.length ? tags[0] : 'general', // parent_permlink
      myAccount.name, // author
      kebabCase(title), // permlink
      title,
      draftToHtml(editorRaw),
      metadata,
    ));
    yield put(publishContentSuccess());
    yield put(open('Congratulations! Your content has been successfully published!'));
  } catch (e) {
    yield put(publishContentFailure(e.message));
  }
}

export default function* publishContentManager() {
  yield takeLatest(PUBLISH_CONTENT_BEGIN, publishContent);
}
