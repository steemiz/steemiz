import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as userReducer } from './features/User/actions';
import { reducer as postReducer } from './features/Post/actions';
import { reducer as commentsReducer } from './features/Comments/actions';

export default combineReducers({
  router: routerReducer,
  user: userReducer,
  post: postReducer,
  comments: commentsReducer,
});
