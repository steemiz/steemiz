import combine from '../../utils/combine';

/*
 * EXPORTING REDUCERS and SAGAS
 */
import getComments, { getCommentsReducer } from './actions/getComments';
import commentsReducer from './reducer';

export const initialState = {
  commentsChild: {},
  commentsData: {},
  commentsRoots: [],
};

export const reducer = (state = initialState, action) => combine(
  [ getCommentsReducer, commentsReducer ],
  state,
  action,
);

// All sagas to be loaded
export default [
  getComments,
];
