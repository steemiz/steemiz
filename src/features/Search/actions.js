import combine from 'utils/combine';

/*
 * EXPORTING REDUCERS and SAGAS
 */
import search, { searchReducer } from './actions/search';

export const initialState = {
  q: '',
  results: [],
  pages: {},
  hits: undefined,
};

export const reducer = (state = initialState, action) => combine(
  [searchReducer],
  state,
  action,
);

// All sagas to be loaded
export default [
  search,
];
