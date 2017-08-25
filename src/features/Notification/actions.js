import combine from 'utils/combine';
/*
 * EXPORTING REDUCERS and SAGAS
 */
import notification, { notificationReducer } from './actions/notification';

export const initialState = {
  isOpen: false,
  message: '',
  actionName: '',
  actionFunction: null,
  type: '',
};

export const reducer = (state = initialState, action) => combine(
  [notificationReducer],
  state,
  action,
);

// All sagas to be loaded
export default [
  notification,
];
