import { createSelector } from 'reselect';

export const selectAppConfig = () => state => state.app;

/**
 * Other specific selectors
 */
export const selectAppProps = () => createSelector(
  selectAppConfig(),
  state => state.props,
);

export const selectAppRate = () => createSelector(
  selectAppConfig(),
  state => state.rate,
);
