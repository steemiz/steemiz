import includes from 'lodash/includes';

export const getUpvotes = activeVotes =>
  activeVotes.filter(vote => vote.percent > 0);

export const getDownvotes = activeVotes =>
  activeVotes.filter(vote => vote.percent < 0);

export const getFollowingUpvotes = (activeVotes, following) =>
  getUpvotes(activeVotes)
    .filter(vote => includes(following, vote.voter));

export const getFollowingDownvotes = (activeVotes, following) =>
  getDownvotes(activeVotes)
    .filter(vote => includes(following, vote.voter));

export const sortVotes = (votes, sortBy) =>
  votes.sort((a, b) => a[sortBy] - b[sortBy]);
