import combine from '../../utils/combine';

/*
 * EXPORTING REDUCERS and SAGAS
 */
import getProfile, { getProfileReducer } from './actions/getProfile';
import logout, { logoutReducer } from './actions/logout';

export const initialState = {
  profile: {},
};

export const userReducer = (state = initialState, action) => combine(
  [ getProfileReducer, logoutReducer ],
  state,
  action,
);

// All sagas to be loaded
export default [
  getProfile,
  logout,
];
