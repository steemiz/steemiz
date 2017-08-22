import update from 'immutability-helper';
import { manageContentVote } from '../Vote/utils';
import { VOTE_OPTIMISTIC } from '../Vote/actions/vote';
import { GET_COMMENTS_FROM_POST_SUCCESS } from './actions/getCommentsFromPost';
import { GET_COMMENTS_FROM_USER_SUCCESS } from './actions/getCommentsFromUser';
import { GET_REPLIES_TO_USER_SUCCESS } from './actions/getRepliesToUser';
import { getCommentsChildrenLists, mapCommentsBasedOnId } from './utils/comments';

export default function commentsReducer(state, action) {
  switch (action.type) {
    case GET_COMMENTS_FROM_POST_SUCCESS:
    case GET_COMMENTS_FROM_USER_SUCCESS:
    case GET_REPLIES_TO_USER_SUCCESS: {
      return {
        ...state,
        commentsChild: Object.assign(getCommentsChildrenLists(action.state), state.commentsChild),
        commentsData: Object.assign(mapCommentsBasedOnId(action.state.content), state.commentsData),
      };
    }
    case VOTE_OPTIMISTIC: {
      const { contentId, accountName, weight, params: { type } } = action;
      if (type === 'comment') {
        const newComment = manageContentVote({ ...state.commentsData[contentId] }, weight, accountName);
        return update(state, {
          commentsData: {
            [contentId]: {$set:
              newComment,
            }
          }
        });
      } else {
        return state;
      }
    }
    default:
      return state;
  }
}
