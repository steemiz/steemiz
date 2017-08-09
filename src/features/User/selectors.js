import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';

const selectUserDomain = () => state => state.user;

/**
 * Other specific selectors
 */
export const selectMe = () => createSelector(
  selectUserDomain(),
  state => state.me,
);

export const selectAccounts = () => createSelector(
  selectUserDomain(),
  state => state.accounts || {},
);

export const selectMyAccount = () => createSelector(
  [selectMe(), selectAccounts()],
  (me, accounts) => accounts[me] || {},
);

export const selectIsConnected = () => createSelector(
  selectMe(),
  profile => !isEmpty(profile),
);

export const selectMyAccountMetadata = () => createSelector(
  selectMyAccount(),
  account => account && account.json_metadata ? JSON.parse(account.json_metadata) : {},
);

export const selectAccount = accountName => createSelector(
  selectAccounts(),
  accounts => accounts[accountName] || {},
);

export const selectVoteHistory = accountName => createSelector(
  selectAccount(accountName),
  account => account.vote_history,
);

export const selectFollowers = accountName => createSelector(
  selectAccount(accountName),
  account => account.followers,
);

export const selectFollowersAccounts = accountName => createSelector(
  [selectAccounts(), selectFollowers(accountName)],
  (accounts, followers) => {
    if (!followers) {
      return [];
    }
    const followersAccounts = [];
    followers.forEach(follow => {
      if (accounts[follow.followers]) {
        followersAccounts.push(accounts[follow.followers]);
      }
    });
    return followersAccounts;
  },
);

export const selectFollowing = accountName => createSelector(
  selectAccount(accountName),
  account => account.following,
);

export const selectFollowingAccounts = accountName => createSelector(
  [selectAccounts(), selectFollowing(accountName)],
  (accounts, following) => {
    if (!following) {
      return [];
    }
    const followingAccounts = [];
    following.forEach(follow => {
      if (accounts[follow.following]) {
        followingAccounts.push(accounts[follow.following]);
      }
    });
    return followingAccounts;
  },
);

export const selectRewardsCuration = accountName => createSelector(
  selectAccount(accountName),
  account => account.rewards_curation,
);
