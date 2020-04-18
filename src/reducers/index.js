/*
  root reducer with combination of all reducers.
*/
import { combineReducers } from 'redux';
import userReducer from './userreducer';
const rootReducer = combineReducers({
    user:userReducer
});
export default rootReducer;