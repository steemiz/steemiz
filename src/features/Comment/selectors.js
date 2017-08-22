import { createSelector } from 'reselect';

export const selectCommentsDomain = () => state => state.comments;

/**
 * Other specific selectors
 */
export const selectCommentsData = () => createSelector(
  selectCommentsDomain(),
  state => state.commentsData || {},
);

export const selectCommentsChild = () => createSelector(
  selectCommentsDomain(),
  state => state.commentsChild || {},
);

export const selectCommentsIsLoading = () => createSelector(
  selectCommentsDomain(),
  state => state.isLoading,
);

export const selectCommentById = id => createSelector(
  selectCommentsData(),
  commentsData => commentsData[id] || {},
);

export const selectCommentsFromPost = id => createSelector(
  selectCommentsDomain(),
  state => state.commentsFromPost[id] || [],
);

// COMMENTS FROM USER
export const selectCommentsFromUser = name => createSelector(
  selectCommentsDomain(),
  state => state.commentsFromUser[name] || {},
);

export const selectListCommentsFromUser = name => createSelector(
  selectCommentsFromUser(name),
  state => state.list || [],
);

export const selectObjectCommentsFromUser = name => createSelector(
  [selectListCommentsFromUser(name), selectCommentsData()],
  (list, data) => list.map(commentId => data[commentId]),
);

export const selectLastPermlinkCommentsFromUser = name => createSelector(
  selectObjectCommentsFromUser(name),
  commentsArray => commentsArray[commentsArray.length - 1].permlink,
);

export const selectHasMoreCommentsFromUser = name => createSelector(
  selectCommentsFromUser(name),
  state => state.hasMore || false,
);

export const selectIsLoadingCommentsFromUser = name => createSelector(
  selectCommentsFromUser(name),
  state => state.isLoading || false,
);

// REPLIES TO USER
const selectRepliesToUser = name => createSelector(
  selectCommentsDomain(),
  state => state.repliesToUser[name] || {},
);

export const selectListRepliesToUser = name => createSelector(
  selectRepliesToUser(name),
  state => state.list || [],
);

export const selectObjectRepliesToUser = name => createSelector(
  [selectListRepliesToUser(name), selectCommentsData()],
  (list, data) => list.map(commentId => data[commentId]),
);

export const selectLastObjectRepliesToUser = name => createSelector(
  selectObjectRepliesToUser(name),
  commentsArray => commentsArray[commentsArray.length - 1],
);

export const selectHasMoreRepliesToUser = name => createSelector(
  selectRepliesToUser(name),
  state => state.hasMore || true,
);

export const selectIsLoadingRepliesToUser = name => createSelector(
  selectRepliesToUser(name),
  state => state.isLoading || false,
);
