import {
  SEARCH,
  REDIRECT_SEARCH,
} from '../actions/types';

const INITIAL_STATE = {
  searchInput: '',
  redirectToSearchResult: false,
};

const search = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEARCH:
      return { ...state, searchInput: action.payload };
    case REDIRECT_SEARCH:
      return { ...state, redirectToSearchResult: action.payload }
    default:
      return state;
  }
};

export default search;
