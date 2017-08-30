import { createSelector } from 'reselect';
import { selectAppProps } from '../App/selectors';
import { formatter } from 'steem';

const selectUserDomain = () => state => state.user;

/**
 * Other specific selectors
 */
export const selectMe = () => createSelector(
  selectUserDomain(),
  state => state.me,
);

// ACCOUNTS
export const selectAccounts = () => createSelector(
  selectUserDomain(),
  state => state.accounts || {},
);

export const selectAccount = accountName => createSelector(
  selectAccounts(),
  accounts => { return accounts[accountName] || {}; },
);

export const selectCurrentUser = () => createSelector(
  selectUserDomain(),
  state => state.currentUser,
);

export const selectCurrentAccount = () => createSelector(
  [selectCurrentUser(), selectAccounts()],
  (currentUser, accounts) => accounts[currentUser] || {},
);

export const selectMyAccount = () => createSelector(
  [selectMe(), selectAccounts()],
  (me, accounts) => accounts[me] || {},
);

export const selectIsConnected = () => createSelector(
  selectMe(),
  me => !!me,
);

export const selectVoteHistory = accountName => createSelector(
  selectAccount(accountName),
  account => account.votes,
);

// FOLLOWERS
export const selectFollowers = () => createSelector(
  selectUserDomain(),
  state => state.followers,
);

export const selectFollowersFromUser = accountName => createSelector(
  selectFollowers(),
  state => state[accountName] || {},
);

export const selectFollowersCount = accountName => createSelector(
  selectFollowersFromUser(accountName),
  state => state.count,
);

export const selectFollowersList = accountName => createSelector(
  selectFollowersFromUser(accountName),
  state =>  state.list || [],
);

export const selectLastFollower = accountName => createSelector(
  selectFollowersList(accountName),
  state => state[state.length - 1],
);

export const selectFollowersAccounts = accountName => createSelector(
  [selectAccounts(), selectFollowersList(accountName)],
  (accounts, followers) => {
    if (!followers.length) {
      return [];
    }
    const followersAccounts = [];
    followers.forEach(follow => {
      if (accounts[follow.follower]) {
        followersAccounts.push(accounts[follow.follower]);
      }
    });
    return followersAccounts;
  },
);

// FOLLOWING
export const selectFollowings = () => createSelector(
  selectUserDomain(),
  state => state.followings,
);

export const selectFollowingsFromUser = accountName => createSelector(
  selectFollowings(),
  state => state[accountName] || {},
);

export const selectFollowingsCount = accountName => createSelector(
  selectFollowingsFromUser(accountName),
  state => state.count,
);

export const selectFollowingsList = accountName => createSelector(
  selectFollowingsFromUser(accountName),
  state =>  state.list || [],
);

export const selectLastFollowing = accountName => createSelector(
  selectFollowingsList(accountName),
  state => state[state.length - 1],
);

export const selectFollowingsAccounts = accountName => createSelector(
  [selectAccounts(), selectFollowingsList(accountName)],
  (accounts, followings) => {
    if (!followings.length) {
      return [];
    }
    const followingsAccounts = [];
    followings.forEach(follow => {
      if (accounts[follow.following]) {
        followingsAccounts.push(accounts[follow.following]);
      }
    });
    return followingsAccounts;
  },
);

// HISTORY TRANSFER (REWARDS, VOTES)
export const selectHistoryTransfer = accountName => createSelector(
  selectAccount(accountName),
  account => account.history_transfer || {},
);

export const selectHistoryTransferList = accountName => createSelector(
  selectHistoryTransfer(accountName),
  historyTransfer => historyTransfer.list || [],
);

export const selectRewardsCuration = accountName => createSelector(
  [selectHistoryTransferList(accountName), selectAppProps()],
  (transferHistory, appProps) => {
    if (!appProps) {
      return [];
    }
    return transferHistory
      .filter(transfer => transfer.type === 'curation_reward').map(transfer => ({
        ...transfer,
        steemPower: formatter.vestToSteem(transfer.reward, appProps.total_vesting_shares, appProps.total_vesting_fund_steem),
      }));
  },
);

export const selectLastWeekRewardsCuration = accountName => createSelector(
  selectRewardsCuration(accountName),
  curation => {
    const timestampOneWeekAgo = Date.now() - 604800000;
    return curation
      .filter(transfer => Date.parse(transfer.timestamp) > timestampOneWeekAgo)
      .reduce((total, transfer) => total += transfer.steemPower, 0);
  },
);

export const selectRewardsAuthor = accountName => createSelector(
  [selectHistoryTransferList(accountName), selectAppProps()],
  (transferHistory, appProps) => {
    if (!appProps) {
      return [];
    }
    return transferHistory
      .filter(transfer => transfer.type === 'author_reward').map(transfer => ({
        ...transfer,
        steemPower: formatter.vestToSteem(transfer.vesting_payout, appProps.total_vesting_shares, appProps.total_vesting_fund_steem),
      }));
  },
);

export const selectLastWeekRewardsAuthor = accountName => createSelector(
  selectRewardsAuthor(accountName),
  curation => {
    const timestampOneWeekAgo = Date.now() - 604800000;
    return curation
      .filter(transfer => Date.parse(transfer.timestamp) > timestampOneWeekAgo)
      .reduce((total, transfer) => total += transfer.steemPower, 0);
  },
);

export const selectVotes = accountName => createSelector(
  selectHistoryTransferList(accountName),
  transferHistory => {
    return transferHistory
      .filter(transfer => transfer.type === 'vote');
  },
);

export const selectGivenVotes = accountName => createSelector(
  selectVotes(accountName),
  votes => {
    return votes
      .filter(vote => vote.voter === accountName);
  },
);

export const selectReceivedVotes = accountName => createSelector(
  selectVotes(accountName),
  votes => {
    return votes
      .filter(vote => vote.author === accountName);
  },
);
