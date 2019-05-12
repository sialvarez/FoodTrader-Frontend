import { combineReducers } from 'redux';
import tests from './testReducer';
import login from './loginReducer'
import modal from './modalReducer'

const rootReducer = combineReducers({
  tests,
  login,
  modal,
});

export default rootReducer;
