import { combineReducers } from 'redux';
import tests from './testReducer';
import login from './loginReducer'
import modal from './modalReducer'
import publication from './publicationReducer'
import search from './searchReducer'

const rootReducer = combineReducers({
  tests,
  login,
  modal,
  publication,
  search,
});

export default rootReducer;
