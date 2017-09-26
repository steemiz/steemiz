import { createSelector } from 'reselect';

export const selectSearchDomain = () => state => state.search;

/**
 * Other specific selectors
 */
export const selectSearch = () => createSelector(
  selectSearchDomain(),
  state => state,
);
