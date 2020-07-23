import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import training from './training';
import progress from './progress';
import statistics from './statistics';


const rootReducer = combineReducers({
  auth,
  alert,
  training,
  progress,
  statistics,
})

export default rootReducer;
