import { VOTE_OPTIMISTIC, VOTE_FAILURE } from '../Vote/actions/vote';

export default function postReducer(state, action) {
  switch (action.type) {
    case VOTE_OPTIMISTIC: {
      const { username, weight, params: { type, category, index } } = action;
      if (type === 'post') {
        const newPosts = [ ...state[category] ];
        if (weight > 0) {
          // VOTE
          newPosts[index].active_votes.push({
            voter: username,
            percent: weight,
          });
        } else {
          // UNVOTE
          newPosts[index].active_votes = newPosts[index].active_votes.filter(vote => vote.voter !== username);
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
