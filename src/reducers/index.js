import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import training from './training';


const rootReducer = combineReducers({
  auth,
  alert,
  training
})

export default rootReducer;
