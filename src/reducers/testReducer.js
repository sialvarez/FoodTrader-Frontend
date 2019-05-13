import {
  WRITE,
} from '../actions/types';

const INITIAL_STATE = {
  text: '',
};

const tests = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case WRITE:
      return { ...state, text: action.payload };
    default:
      return state;
  }
};

export default tests;
