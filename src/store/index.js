// Here is the location for all the reducers in redux for the app

import { combineReducers } from 'redux';
import uiReducer from './reducers/ui';
import authReducer from './reducers/auth';

export default combineReducers({
  auth: authReducer,
  ui: uiReducer  
})