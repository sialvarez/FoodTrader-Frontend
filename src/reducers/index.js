import { combineReducers } from 'redux';
import tests from './testReducer';
import login from './loginReducer'
import modal from './modalReducer'
import publication from './publicationReducer'

const rootReducer = combineReducers({
  tests,
  login,
  modal,
  publication,
});

export default rootReducer;
