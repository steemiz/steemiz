import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { userReducer } from './features/User/actions';
import { postReducer } from './features/Post/actions';

export default combineReducers({
  router: routerReducer,
  user: userReducer,
  post: postReducer,
});
