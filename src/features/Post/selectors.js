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

export const selectCurrentCategory = () => createSelector(
  selectPostDomain(),
  posts => posts.currentCategory,
);

export const selectCurrentTag = () => createSelector(
  selectPostDomain(),
  posts => posts.currentTag,
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

export const selectCategory = () => createSelector(
  [selectPostDomain(), selectCurrentCategory()],
  (state, category) => { return state.categories[category]; },
);

export const selectCategoryTag = () => createSelector(
  [selectCurrentTag(), selectCategory()],
  (tag, category) => { return category && category[tag] || {} }
);

export const selectCategoryTagList = () => createSelector(
  selectCategoryTag(),
  categoryTag => {
    return categoryTag.list || [];
  },
);

export const selectAllPostsFromCategory = () => createSelector(
  [selectCategoryTagList(), selectPosts()],
  (categoryTagList, posts) => {
    return categoryTagList.map(id => posts[id]);
  }
);

export const selectPostsIsLoading = () => createSelector(
  selectCategoryTag(),
  categoryTag => categoryTag.isLoading || false,
);

/*export const selectPostVideosFeed = () => createSelector(
  selectPostFeed(),
  state => state.filter(post => post.json_metadata && !isEmpty(post.json_metadata.links) && post.json_metadata.links.find(link => link.match(/youtube/))) || [],
);*/

export const selectCategoryTagHasMore = () => createSelector(
  selectCategoryTag(),
  categoryTag => categoryTag.hasMore || false,
);

export const selectOnePostFromCategory = (category, index) => createSelector(
  selectAllPostsFromCategory(category),
  posts => posts[index] ? posts[index] : {},
);
