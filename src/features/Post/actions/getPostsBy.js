import { call, put, takeEvery } from 'redux-saga/effects';
import steem from 'steem';
import format from '../utils/format';

/*--------- CONSTANTS ---------*/
const GET_POSTS_BY_BEGIN = 'GET_POSTS_BY_BEGIN';
const GET_POSTS_BY_SUCCESS = 'GET_POSTS_BY_SUCCESS';
const GET_POSTS_BY_FAILURE = 'GET_POSTS_BY_FAILURE';

/*--------- ACTIONS ---------*/
export function getPostsByBegin(category, query) {
  return { type: GET_POSTS_BY_BEGIN, category, query };
}

export function getPostsBySuccess(category, posts) {
  return { type: GET_POSTS_BY_SUCCESS, category, posts };
}

export function getPostsByFailure(message) {
  return { type: GET_POSTS_BY_FAILURE, message };
}

/*--------- REDUCER ---------*/
export function getPostsByReducer(state, action) {
  switch (action.type) {
    case GET_POSTS_BY_SUCCESS:
      return {
        ...state,
        [action.category]: action.posts,
      };
    default:
      return state;
  }
}

/*--------- SAGAS ---------*/
function* getPostsBy({ category, query }) {
  try {
    let posts;
    switch(category) {
      case 'created':
        posts = yield steem.api.getDiscussionsByCreated(query);
        break;
      case 'feed':
        posts = yield steem.api.getDiscussionsByFeed(query);
        break;
    }

    const formattedPosts = posts.map(post => format(post));
    yield put(getPostsBySuccess(category, formattedPosts));
  } catch(e) {
    yield put(getPostsByFailure(e.message));
  }
}

export default function* getPostsByManager() {
  yield takeEvery(GET_POSTS_BY_BEGIN, getPostsBy);
}
