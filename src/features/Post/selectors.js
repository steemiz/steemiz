import { createSelector } from 'reselect';
import { selectCommentsDomain } from 'features/Comment/selectors';

const selectPostDomain = () => state => state.post;

/**
 * Other specific selectors
 */
export const selectPublishFormOpen = () => createSelector(
  selectPostDomain(),
  state => state.publishFormOpen,
);

export const selectIsPublishing = () => createSelector(
  selectPostDomain(),
  state => state.isPublishing,
);

export const selectPosts = () => createSelector(
  selectPostDomain(),
  state => state.posts,
);

export const selectCategories = () => createSelector(
  selectPostDomain(),
  state => state.categories,
);

export const selectCurrentPostId = () => createSelector(
  selectPostDomain(),
  posts => posts.currentPostId,
);

export const selectPostByPermlink = (author, permlink) => createSelector(
  selectPosts(),
  posts => posts[`${author}/${permlink}`] || {},
);

export const selectCurrentPost = () => createSelector(
  [selectPosts(), selectCurrentPostId()],
  (posts, id) => posts[id],
);

export const selectCurrentComments = () => createSelector(
  [selectCurrentPostId(), selectCommentsDomain()],
  (currentPostId, commentsDomain) => {
    return currentPostId ? commentsDomain.commentsFromPost[currentPostId] : {};
  }
);

/*export const selectPostVideosFeed = () => createSelector(
  selectPostFeed(),
  state => state.filter(post => post.json_metadata && !isEmpty(post.json_metadata.links) && post.json_metadata.links.find(link => link.match(/youtube/))) || [],
);*/
