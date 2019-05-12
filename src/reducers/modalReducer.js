import {
  PUBLICATION_MODAL,
} from '../actions/types';

const INITIAL_STATE = {
  publicationModal: false,
};

const publicationModalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PUBLICATION_MODAL:
      return { ...state, publicationModal: action.payload };
    default:
      return state;
  }
};

export default publicationModalReducer;