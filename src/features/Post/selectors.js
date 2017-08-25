import { createSelector } from 'reselect';
import { selectCommentsDomain } from '../Comment/selectors';

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

export const selectCurrentPostId = () => createSelector(
  selectPostDomain(),
  posts => posts.currentPostId,
);

export const selectPostById = id => createSelector(
  selectPosts(),
  posts => posts[id] || {},
);

export const selectCurrentPost = () => createSelector(
  [selectPosts(), selectCurrentPostId()],
  (posts, id) => posts[id],
);

export const selectCurrentComments = () => createSelector(
  selectCurrentPostId(),
  selectCommentsDomain(),
  (currentPostId, commentsDomain) => {
    return currentPostId ? commentsDomain.commentsFromPost[currentPostId] : {};
  }
);

export const selectCategory = category => createSelector(
  selectPostDomain(),
  state => { return state.categories[category]; },
);

export const selectCategoryTag = (category, tag) => createSelector(
  selectCategory(category),
  category => { return category[tag] || {} }
);

export const selectCategoryTagList = (category, tag) => createSelector(
  selectCategoryTag(category, tag),
  categoryTag => {
    return categoryTag.list || [];
  },
);

export const selectAllPostsFromCategory = (category, tag) => createSelector(
  [selectCategoryTagList(category, tag), selectPosts()],
  (categoryTagList, posts) => {
    return categoryTagList.map(id => posts[id]);
  }
);

export const selectPostsIsLoading = (category, tag) => createSelector(
  selectCategoryTag(category, tag),
  categoryTag => categoryTag.isLoading || false,
);

/*export const selectPostVideosFeed = () => createSelector(
  selectPostFeed(),
  state => state.filter(post => post.json_metadata && !isEmpty(post.json_metadata.links) && post.json_metadata.links.find(link => link.match(/youtube/))) || [],
);*/

export const selectCategoryTagHasMore = (category, tag) => createSelector(
  selectCategoryTag(category, tag),
  categoryTag => categoryTag.hasMore || false,
);

export const selectOnePostFromCategory = (category, index) => createSelector(
  selectAllPostsFromCategory(category),
  posts => posts[index] ? posts[index] : {},
);
