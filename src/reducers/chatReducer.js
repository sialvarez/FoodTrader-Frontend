import {
  NEW_MESSAGE,
} from '../actions/types';

const INITIAL_STATE = {
  newMessage: {},
};

const newMessageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NEW_MESSAGE:
      return { ...state, newMessage: action.payload };
    default:
      return state;
  }
};

export default newMessageReducer;