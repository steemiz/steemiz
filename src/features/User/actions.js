import combine from '../../utils/combine';

/*
 * EXPORTING REDUCERS and SAGAS
 */
import getMe, { getMeReducer } from './actions/getMe';
import getAccounts, { getAccountsReducer } from './actions/getAccounts';
import getFollowerCount, { getFollowerCountReducer } from './actions/getFollowerCount';
import getFollowers, { getFollowersReducer } from './actions/getFollowers';
import getFollowing, { getFollowingReducer } from './actions/getFollowing';
import getVoteHistory, { getVoteHistoryReducer } from './actions/getVoteHistory';
import getRewards, { getRewardsReducer } from './actions/getRewards';
import logout, { logoutReducer } from './actions/logout';

export const initialState = {
  me: '',
  accounts: {},
};

export const reducer = (state = initialState, action) => combine(
  [
    getMeReducer,
    getAccountsReducer,
    getFollowerCountReducer,
    getFollowersReducer,
    getFollowingReducer,
    getVoteHistoryReducer,
    getRewardsReducer,
    logoutReducer,
  ],
  state,
  action,
);

// All sagas to be loaded
export default [
  getMe,
  getAccounts,
  getFollowerCount,
  getFollowers,
  getFollowing,
  getVoteHistory,
  getRewards,
  logout,
];
