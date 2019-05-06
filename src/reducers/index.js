import { combineReducers } from 'redux';
import tests from './testReducer';

const rootReducer = combineReducers({
  tests,
});

export default rootReducer;
