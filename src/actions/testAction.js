import {
  WRITE,
} from './types';

export const addWord = (text) => (
  {
    type: WRITE,
    payload: text,
  }
);
