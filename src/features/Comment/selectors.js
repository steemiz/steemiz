import { createSelector } from 'reselect';

export const selectCommentsDomain = () => state => state.comments;

/**
 * Other specific selectors
 */
export const selectCommentsData = () => createSelector(
  selectCommentsDomain(),
  state => state.commentsData || {},
);

export const selectCommentsFromUser = name => createSelector(
  selectCommentsDomain(),
  state => state.commentsByUser[name] || {},
);

export const selectRepliesToUser = name => createSelector(
  selectCommentsDomain(),
  state => state.repliesToUser[name] || {},
);
