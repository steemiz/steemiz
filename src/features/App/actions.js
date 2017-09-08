import combine from 'utils/combine';

/*
 * EXPORTING REDUCERS and SAGAS
 */
import getAppConfig, { getAppConfigReducer } from './actions/getAppConfig';
import { sidebarReducer } from './actions/sidebar';
import { setCategoryTagReducer } from './actions/setCategoryTag';

export const initialState = {
  sidebar: {
    open: true,
  },
  currentCategory: 'trending',
  currentTag: '',
};

export const reducer = (state = initialState, action) => combine(
  [ getAppConfigReducer, sidebarReducer, setCategoryTagReducer ],
  state,
  action,
);

// All sagas to be loaded
export default [
  getAppConfig,
];
