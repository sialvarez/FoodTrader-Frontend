import {
  NEW_MESSAGE,
} from './types';

export const newMessageAction = (msg) => (
  {
    type: NEW_MESSAGE,
    payload: msg,
  }
);
