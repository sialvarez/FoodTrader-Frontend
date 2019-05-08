import {
  LOGIN,
} from './types';

export const loginUser = (user) => (
  {
    type: LOGIN,
    payload: user,
  }
);
