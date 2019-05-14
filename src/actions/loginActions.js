import {
  LOGIN,
  LOGOUT,
} from './types';

export const loginUser = (user) => (
  {
    type: LOGIN,
    payload: user,
  }
);

export const logoutAction = () => (
  {
    type: LOGOUT,
    payload: {},
  }
);
