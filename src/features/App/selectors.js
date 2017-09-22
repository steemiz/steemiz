import { createSelector } from 'reselect';

export const selectAppConfig = () => state => state.app;

/**
 * Other specific selectors
 */
export const selectAppProps = () => createSelector(
  selectAppConfig(),
  state => state.props,
);

export const selectAppRewardFund = () => createSelector(
  selectAppConfig(),
  state => state.rewardFund,
);

export const selectAppRate = () => createSelector(
  selectAppConfig(),
  state => state.rate,
);

export const selectTrendingTags = () => createSelector(
  selectAppConfig(),
  state => state.trendingTags || [],
);

export const selectIsSidebarOpen = () => createSelector(
  selectAppConfig(),
  state => state.sidebar.open,
);

export const selectCurrentCategory = () => createSelector(
  selectAppConfig(),
  posts => posts.currentCategory,
);

export const selectCurrentTag = () => createSelector(
  selectAppConfig(),
  posts => posts.currentTag,
);
