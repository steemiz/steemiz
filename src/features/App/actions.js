import combine from '../../utils/combine';

/*
 * EXPORTING REDUCERS and SAGAS
 */
import getAppConfig, { getAppConfigReducer } from './actions/getAppConfig';
import { sidebarReducer } from './actions/sidebar';

export const initialState = {
  sidebar: {
    open: true,
  }
};

export const reducer = (state = initialState, action) => combine(
  [ getAppConfigReducer, sidebarReducer ],
  state,
  action,
);

// All sagas to be loaded
export default [
  getAppConfig,
];
