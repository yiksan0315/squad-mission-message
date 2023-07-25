// Action types
const ADD_MESSAGE = 'Chatting/ADD_MESSAGE';
const SET_MESSAGES = 'Chatting/SET_MESSAGES';
const SET_CHATTING = 'Chatting/SET_CHATTING';

// Action Creating functions

export const addMessage = (message) => {
  return {
    type: ADD_MESSAGE,
    message,
  };
};

export const setChatting = (chatting) => {
  return {
    type: SET_CHATTING,
    chatting,
  };
};

export const setMessages = (messages) => {
  return {
    type: SET_MESSAGES,
    messages,
  };
};

// Declare Initial state
const initialState = {
  chatting: null,
  messages: [],
};

// Declare Reducer
export default function Chatting(state = initialState, action) {
  switch (action.type) {
    case ADD_MESSAGE:
      return { ...state, messages: [...state.messages, action.message] };
    case SET_CHATTING:
      return { ...state, chatting: action.chatting };
    case SET_MESSAGES:
      return { ...state, messages: action.messages };
    default:
      return state;
  }
}
