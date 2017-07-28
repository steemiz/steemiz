import { createSelector } from 'reselect';

const selectUserDomain = () => state => state.user;

/**
 * Other specific selectors
 */
export const selectProfile = () => createSelector(
  selectUserDomain(),
  state => state.profile,
);

export const selectProfileMetadata = () => createSelector(
  selectProfile(),
  state => state.account && state.account.json_metadata ? JSON.parse(state.account.json_metadata) : {},
);
