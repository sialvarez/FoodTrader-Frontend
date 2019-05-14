import {
  LOGIN,
  LOGOUT,
} from '../actions/types';

const INITIAL_STATE = {
  user: {},
};

const login = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, user: action.payload };
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export default login;
