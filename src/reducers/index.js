import { combineReducers } from 'redux';
import tests from './testReducer';
import login from './loginReducer'

const rootReducer = combineReducers({
  tests,
  login,
});

export default rootReducer;
