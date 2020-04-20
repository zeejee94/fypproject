/*
  root reducer with combination of all reducers.
*/
import { combineReducers } from 'redux';
import userReducer from './userreducer';
import productreducer from './productreducer';
const rootReducer = combineReducers({
    user:userReducer,
    product:productreducer
});
export default rootReducer;