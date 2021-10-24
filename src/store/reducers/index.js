import {combineReducers} from 'redux';
import lockReducer from '../lock/reducers/lock.reducer';

const createReducer = () =>
  combineReducers({
    lockReducer: lockReducer,
  });

export default createReducer;
