import { select, put, takeEvery } from 'redux-saga/effects';
import update from 'immutability-helper';
import { VOTE_FAILURE, VOTE_OPTIMISTIC } from 'features/Vote/actions/vote';
import { manageContentVote } from 'features/Vote/utils';
import format from '../utils/format';
import { getDiscussionsFromAPI } from 'utils/helpers/apiHelpers';
import { selectPosts } from '../selectors';

/*--------- CONSTANTS ---------*/
const GET_POSTS_BY_BEGIN = 'GET_POSTS_BY_BEGIN';
const GET_POSTS_BY_SUCCESS = 'GET_POSTS_BY_SUCCESS';
const GET_POSTS_BY_FAILURE = 'GET_POSTS_BY_FAILURE';
const NO_MORE_POSTS = 'NO_MORE_POSTS';

/*--------- ACTIONS ---------*/
export function getPostsByBegin(category, query) {
  return { type: GET_POSTS_BY_BEGIN, category, query };
}

export function getPostsBySuccess(category, tag, posts) {
  return { type: GET_POSTS_BY_SUCCESS, category, tag, posts };
}

export function getPostsByFailure(message) {
  return { type: GET_POSTS_BY_FAILURE, message };
}

export function setNoMore(category, tag) {
  return { type: NO_MORE_POSTS, category, tag };
}

/*--------- REDUCER ---------*/
export function getPostsByReducer(state, action) {
  switch (action.type) {
    case GET_POSTS_BY_BEGIN: {
      const { category, query } = action;
      const tag = query.tag || 'all';
      // Initializing category structure
      return update(state, {
        categories: {
          [category]: {$auto: {
            [tag]: {$auto: {
              list: {$autoArray: {}},
              hasMore: {$apply: hasMore => hasMore !== false},
              isLoading: {$apply: isLoading => isLoading !== false},
            }},
          }},
        },
      });
    }
    case GET_POSTS_BY_SUCCESS: {
      const { category, tag, posts } = action;
      const postsObject = {};
      posts.forEach(post => {
        postsObject[post.id] = post;
      });

      return update(state, {
        posts: { $merge: postsObject },
        categories: {
          [category]: {
            [tag]: {
              list: {$push:
                posts.map(post => post.id),
              },
              isLoading: {$set: false},
            },
          },
        },
      });
    }
    case NO_MORE_POSTS: {
      const { category, tag } = action;
      return update(state, {
        categories: {
          [category]: {
            [tag]: {
              hasMore: {$set: false},
            }
          }
        }
      });
    }
    case VOTE_OPTIMISTIC: {
      const { contentId, accountName, weight, params: { type } } = action;
      if (type === 'post') {
        const newPost = manageContentVote({ ...state.posts[contentId] }, weight, accountName);
        return update(state, {
          posts: {
            [contentId]: {$set:
              newPost,
            },
          },
        });
      } else {
        return state;
      }
    }
    case VOTE_FAILURE: {
      const { contentId, accountName } = action;
      return update(state, {
        posts: {
          [contentId]: {
            active_votes: {$apply: votes => {
              return votes.filter(vote => {
                if (vote.voter !== accountName) {
                  return true;
                }
                return vote.percent <= 0;
              });
            }},
            net_votes: {$apply: count => count - 1}
          }
        },
      });
    }
    default:
      return state;
  }
}

/*--------- SAGAS ---------*/
function* getPostsBy({ category, query }) {
  try {
    const statePosts = yield select(selectPosts());
    const posts = yield getDiscussionsFromAPI(category, query);
    const tag = query.tag || 'all';

    const filteredPosts = posts.filter(post => !statePosts[post.id]);
    if (filteredPosts.length === 0) {
      yield put(setNoMore(category, tag, true));
    }
    const formattedPosts = filteredPosts.map(post => format(post));

    yield put(getPostsBySuccess(category, tag, formattedPosts));
  } catch(e) {
    yield put(getPostsByFailure(e.message));
  }
}

export default function* getPostsByManager() {
  yield takeEvery(GET_POSTS_BY_BEGIN, getPostsBy);
}
