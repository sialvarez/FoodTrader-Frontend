import {
  SEARCH,
  REDIRECT_SEARCH,
} from './types';

export const changeSearch = (input) => (
  {
    type: SEARCH,
    payload: input,
  }
);

export const redirectSearch = (input) => (
  {
    type: REDIRECT_SEARCH,
    payload: input,
  }
);
