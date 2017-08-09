import { VOTE_OPTIMISTIC } from '../Vote/actions/vote';
import { GET_COMMENTS_FROM_POST_SUCCESS } from './actions/getCommentsFromPost';
import { GET_COMMENTS_FROM_USER_SUCCESS } from './actions/getCommentsFromUser';
import { getCommentsChildrenLists, mapCommentsBasedOnId } from './utils/comments';

export default function commentsReducer(state, action) {
  switch (action.type) {
    case GET_COMMENTS_FROM_POST_SUCCESS:
    case GET_COMMENTS_FROM_USER_SUCCESS: {
      return {
        ...state,
        commentsChild: Object.assign(getCommentsChildrenLists(action.state), state.commentsChild),
        commentsData: Object.assign(mapCommentsBasedOnId(action.state.content), state.commentsData),
      };
    }
    case VOTE_OPTIMISTIC: {
      const { postId, accountName, weight, params: { type } } = action;
      if (type === 'comment') {
        let newActiveVotes = [...state.commentsData[postId].active_votes];
        let newNetVotes = state.commentsData[postId].net_votes;
        if (weight > 0) {
          // VOTE
          newActiveVotes.push({
            voter: accountName,
            percent: weight,
          });
          newNetVotes++;
        } else {
          // UNVOTE
          newActiveVotes = newActiveVotes.filter(vote => vote.voter !== accountName);
          newNetVotes--;
        }
        return {
          ...state,
          commentsData: {
            ...state.commentsData,
            [postId]: {
              ...state.commentsData[postId],
              active_votes: newActiveVotes,
              net_votes: newNetVotes,
            }
          }
        };
      } else {
        return state;
      }
    }
    default:
      return state;
  }
}
