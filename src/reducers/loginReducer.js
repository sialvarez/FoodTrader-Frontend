import {
  LOGIN,
} from '../actions/types';

const INITIAL_STATE = {
  user: {},
};

const login = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export default login;
