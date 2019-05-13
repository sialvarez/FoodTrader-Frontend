import {
  EDIT_PUBLICATION,
} from './types';

export const editPublication = (publication) => (
  {
    type: EDIT_PUBLICATION,
    payload: publication,
  }
);
