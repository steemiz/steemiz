import combine from 'utils/combine';
import { combineReducers } from 'redux';

/*
 * EXPORTING REDUCERS and SAGAS
 */
import postSearch, { postSearchReducer } from './actions/postSearch';
import suggest, { suggestReducer } from './actions/suggest';
import userSearch, { userSearchReducer } from './actions/userSearch';

export const postInitialState = {
  q: '',
  results: [],
  pages: {},
  hits: undefined,
  term: '',
  suggestions: [],
};

export const userInitialState = {
  q: '',
  results: [],
  pages: {},
  hits: undefined,
  term: '',
};

const postReducer = (state = postInitialState, action) => combine(
  [postSearchReducer, suggestReducer],
  state,
  action,
);

const userReducer = (state = userInitialState, action) => combine(
  [userSearchReducer],
  state,
  action,
);

export const reducer = combineReducers({
  post: postReducer,
  user: userReducer,
});

// All sagas to be loaded
export default [
  postSearch,
  suggest,
  userSearch,
];
