// Action types
const ADD_MESSAGE = 'Chatting/ADD_MESSAGE';

// Action Creating functions

export const addMessage = (message) => {
  return {
    type: ADD_MESSAGE,
    message,
  };
};

// Declare Initial state
const initialState = {
  chattings: [],
};

// Declare Reducer
export default function Chatting(state = initialState, action) {
  switch (action.type) {
    case ADD_MESSAGE:
      return { ...state, chattings: [...state.chattings, action.message] };

    default:
      return state;
  }
}
