import update from 'immutability-helper';
import { manageContentVote } from '../Vote/utils';
import { UPDATE_PAYOUT, VOTE_FAILURE, VOTE_OPTIMISTIC, VOTE_SUCCESS } from '../Vote/actions/vote';
import { GET_COMMENTS_FROM_POST_SUCCESS } from './actions/getCommentsFromPost';
import { GET_COMMENTS_FROM_USER_SUCCESS } from './actions/getCommentsFromUser';
import { GET_REPLIES_TO_USER_SUCCESS } from './actions/getRepliesToUser';
import { getCommentsChildrenLists, mapCommentsBasedOnId } from './utils/comments';
import format from './utils/format';

export default function commentsReducer(state, action) {
  switch (action.type) {
    case GET_COMMENTS_FROM_POST_SUCCESS:
    case GET_COMMENTS_FROM_USER_SUCCESS:
    case GET_REPLIES_TO_USER_SUCCESS: {
      const commentsData = mapCommentsBasedOnId(action.state.content);
      Object.keys(commentsData).forEach(key => {
        commentsData[key] = format(commentsData[key]);
      });
      return {
        ...state,
        commentsChild: Object.assign(getCommentsChildrenLists(action.state), state.commentsChild),
        commentsData: Object.assign(commentsData, state.commentsData),
      };
    }
    case VOTE_OPTIMISTIC: {
      const { content, accountName, weight, params: { type } } = action;
      if (type === 'comment') {
        const newComment = manageContentVote({ ...state.commentsData[content.id] }, weight, accountName);
        return update(state, {
          commentsData: {
            [content.id]: {$set:
              newComment,
            }
          }
        });
      } else {
        return state;
      }
    }
    case VOTE_FAILURE: {
      const { content, accountName, params: { type } } = action;
      if (type === 'comment') {
        return update(state, {
          commentsData: {
            [content.id]: {
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
      if (contentType === 'comment') {
        return update(state, {
          commentsData: {
            [content.id]: {
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
      if (contentType === 'comment') {
        return update(state, {
          commentsData: {
            [content.id]: {
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
