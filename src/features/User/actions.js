import combine from 'utils/combine';
/*
 * EXPORTING REDUCERS and SAGAS
 */
import getMe, { getMeReducer } from './actions/getMe';
import getAccounts, { getAccountsReducer } from './actions/getAccounts';
import getFollowerCount, { getFollowerCountReducer } from './actions/getFollowerCount';
import getFollowers, { getFollowersReducer } from './actions/getFollowers';
import getFollowings, { getFollowingsReducer } from './actions/getFollowings';
import getVoteHistory, { getVoteHistoryReducer } from './actions/getVoteHistory';
import getTransferHistory, { getTransferHistoryReducer } from './actions/getTransferHistory';
import setCurrentUser, { setCurrentUserReducer } from './actions/setCurrentUser';
import logout, { logoutReducer } from './actions/logout';

export const initialState = {
  me: '',
  accounts: {},
  followers: {},
  followings: {},
};

export const reducer = (state = initialState, action) => combine(
  [
    getMeReducer,
    getAccountsReducer,
    getFollowerCountReducer,
    getFollowersReducer,
    getFollowingsReducer,
    getVoteHistoryReducer,
    getTransferHistoryReducer,
    logoutReducer,
    setCurrentUserReducer,
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
  getFollowings,
  getVoteHistory,
  getTransferHistory,
  logout,
  setCurrentUser,
];
