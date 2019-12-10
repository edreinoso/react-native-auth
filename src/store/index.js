import { combineReducers } from 'redux';
import uiReducer from './reducers/ui';
import authReducer from './reducers/auth';

export default combineReducers({
  auth: authReducer,
  ui: uiReducer  
})