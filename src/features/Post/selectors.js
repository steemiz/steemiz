import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';

const selectPostDomain = () => state => state.post;

/**
 * Other specific selectors
 */
/*export const selectPostFeed = () => createSelector(
  selectPostDomain(),
  state => state.feed || [],
);*/

export const selectPostsByCat = category => createSelector(
  selectPostDomain(),
  state => state.categories[category] || [],
);

export const selectRead = () => createSelector(
  selectPostDomain(),
  state => state.read || {},
);

/*export const selectPostVideosFeed = () => createSelector(
  selectPostFeed(),
  state => state.filter(post => post.json_metadata && !isEmpty(post.json_metadata.links) && post.json_metadata.links.find(link => link.match(/youtube/))) || [],
);*/

export const selectPostFromCategory = (category, index) => createSelector(
  selectPostsByCat(category),
  posts => posts[index] ? posts[index] : {},
);
