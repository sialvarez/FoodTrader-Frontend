import { combineReducers } from 'redux';
import tests from './testReducer';
import login from './loginReducer'
import modal from './modalReducer'
import publication from './publicationReducer'
import search from './searchReducer'
import chat from './chatReducer'

const rootReducer = combineReducers({
  tests,
  login,
  modal,
  publication,
  search,
  chat,
});

export default rootReducer;
