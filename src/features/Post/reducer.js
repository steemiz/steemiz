import update from 'immutability-helper';
import {
  UPDATE_PAYOUT,
  VOTE_FAILURE,
  VOTE_OPTIMISTIC,
  VOTE_SUCCESS
} from 'features/Vote/actions/vote';
import { manageContentVote } from 'features/Vote/utils';

function getContentId(content) {
  return `${content.author}/${content.permlink}`;
}

/*--------- REDUCER ---------*/
export default function postsReducer(state, action) {
  switch (action.type) {
    case VOTE_OPTIMISTIC: {
      const { content, accountName, weight, params: { type } } = action;
      if (type === 'post') {
        const contentId = getContentId(content);
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
      const { content, accountName, params: { type } } = action;
      if (type === 'post') {
        const contentId = getContentId(content);
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
      } else {
        return state;
      }
    }
    case VOTE_SUCCESS: {
      const { content, contentType } = action;
      if (contentType === 'post') {
        const contentId = getContentId(content);
        return update(state, {
          posts: {
            [contentId]: {
              isUpdating: {$set: true},
            }
          },
        });
      } else {
        return state;
      }
    }
    case UPDATE_PAYOUT: {
      const { content, contentType } = action;
      if (contentType === 'post') {
        const contentId = getContentId(content);
        return update(state, {
          posts: {
            [contentId]: {
              pending_payout_value: {$set: content.pending_payout_value},
              total_payout_value: {$set: content.total_payout_value},
              active_votes: {$set: content.active_votes},
              isUpdating: {$set: false},
            }
          },
        });
      } else {
        return state;
      }
    }
    default:
      return state;
  }
}
