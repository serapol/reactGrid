import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import appReducer from './app';
import usersReducer from './users';

const rootReducer = combineReducers({
  app: appReducer,
  users: usersReducer,
  routing: routerReducer,
});

export default rootReducer;
