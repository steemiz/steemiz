import { VOTE_OPTIMISTIC } from '../Vote/actions/vote';

export default function commentsReducer(state, action) {
  switch (action.type) {
    case VOTE_OPTIMISTIC: {
      const { postId, username, weight, params: { type } } = action;
      if (type === 'comment') {
        let newActiveVotes = [...state.commentsData[postId].active_votes];
        if (weight > 0) {
          // VOTE
          newActiveVotes.push({
            voter: username,
            percent: weight,
          });
        } else {
          // UNVOTE
          newActiveVotes = newActiveVotes.filter(vote => vote.voter !== username);
        }
        return {
          ...state,
          commentsData: {
            ...state.commentsData,
            [postId]: {
              ...state.commentsData[postId],
              active_votes: newActiveVotes,
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
