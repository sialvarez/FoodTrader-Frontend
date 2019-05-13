import {
  EDIT_PUBLICATION,
} from '../actions/types';

const INITIAL_STATE = {
  publication: {},
};

const editPublication = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EDIT_PUBLICATION:
      return { ...state, publication: { ...action.payload } };
    default:
      return state;
  }
};

export default editPublication;
