import { put, takeEvery } from 'redux-saga/effects';
import steem from 'steem';
import { VOTE_OPTIMISTIC, VOTE_FAILURE } from '../../Vote/actions/vote';
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
export function getPostsByReducer(state = {}, action) {
  switch (action.type) {
    case GET_POSTS_BY_SUCCESS:
      return {
        ...state,
        [action.category]: action.posts,
      };
    case VOTE_OPTIMISTIC: {
      const { accountName, weight, params: { type, category, index } } = action;
      if (type === 'post') {
        const newPosts = [ ...state[category] ];
        if (weight > 0) {
          // VOTE
          newPosts[index].active_votes.push({
            voter: accountName,
            percent: weight,
          });
        } else {
          // UNVOTE
          newPosts[index].active_votes = newPosts[index].active_votes.filter(vote => vote.voter !== accountName);
        }
        return {
          ...state,
          [category]: newPosts,
        };
      } else {
        return state;
      }
    }
    case VOTE_FAILURE: {
      const { category, index, user } = action;
      let newState = state;
      if (category) {
        const newPosts = [ ...state[category] ];
        newPosts[index].active_votes = newPosts[index].active_votes.filter(vote => vote.user !== user);
        newState = {
          ...state,
          [category]: newPosts,
        }
      }
      return newState;
    }
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
        posts = yield steem.api.getDiscussionsByCreatedAsync(query);
        break;
      case 'feed':
        posts = yield steem.api.getDiscussionsByFeedAsync(query);
        break;
      case 'blog':
        posts = yield steem.api.getDiscussionsByBlogAsync(query);
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
