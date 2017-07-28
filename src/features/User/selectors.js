import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';

const selectUserDomain = () => state => state.user;

/**
 * Other specific selectors
 */
export const selectProfile = () => createSelector(
  selectUserDomain(),
  state => state.profile,
);

export const selectIsConnected = () => createSelector(
  selectProfile(),
  profile => !isEmpty(profile),
);

export const selectUsername = () => createSelector(
  selectProfile(),
  profile => profile.user || '',
);

export const selectProfileMetadata = () => createSelector(
  selectProfile(),
  profile => profile.account && profile.account.json_metadata ? JSON.parse(profile.account.json_metadata) : {},
);
