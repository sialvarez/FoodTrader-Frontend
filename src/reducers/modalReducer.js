import {
  PUBLICATION_MODAL,
  SHOWED_PUBLICATION,
} from '../actions/types';

const INITIAL_STATE = {
  publicationModal: false,
  showedPublication: {},
};

const publicationModalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PUBLICATION_MODAL:
      return { ...state, publicationModal: action.payload };
    case SHOWED_PUBLICATION:
      return { ...state, showedPublication: action.payload };
    default:
      return state;
  }
};

export default publicationModalReducer;