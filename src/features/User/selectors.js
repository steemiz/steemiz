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

export const selectAccount = () => createSelector(
  selectProfile(),
  state => state.account || {},
);

export const selectIsConnected = () => createSelector(
  selectProfile(),
  profile => !isEmpty(profile),
);

export const selectUsername = () => createSelector(
  selectProfile(),
  profile => profile.user || '',
);

export const selectAccountMetadata = () => createSelector(
  selectAccount(),
  account => account && account.json_metadata ? JSON.parse(account.json_metadata) : {},
);
