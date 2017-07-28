import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';

const selectPostDomain = () => state => state.post;

/**
 * Other specific selectors
 */
export const selectPostCreated = () => createSelector(
  selectPostDomain(),
  state => state.created || [],
);

export const selectPostFeed = () => createSelector(
  selectPostDomain(),
  state => state.feed || [],
);

export const selectRead = () => createSelector(
  selectPostDomain(),
  state => state.read || {},
);

export const selectComments = () => createSelector(
  selectPostDomain(),
  state => state.comments || {},
);

export const selectPostVideosFeed = () => createSelector(
  selectPostFeed(),
  state => state.filter(post => post.json_metadata && !isEmpty(post.json_metadata.links) && post.json_metadata.links.find(link => link.match(/youtube/))) || [],
);

export const selectPostFromCategory = (category, index) => createSelector(
  selectPostDomain(),
  state => state[category] && state[category][index] ? state[category][index] : {},
);
