import { getChattingById, getMessages, postChatting } from '../api/Chatting';
import { createPromiseThunk, reducerUtils } from '../lib/asyncUtils';

// Action types
const ADD_MESSAGE = 'Chatting/ADD_MESSAGE';

const SET_CHATTING = 'Chatting/SET_CHATTING';
const SET_CHATTING_SUCCESS = 'Chatting/SET_CHATTING_SUCCESS';
const SET_CHATTING_ERROR = 'Chatting/SET_CHATTING_ERROR';

const SET_MESSAGES = 'Chatting/SET_MESSAGES';
const SET_MESSAGES_SUCCESS = 'Chatting/SET_MESSAGES_SUCCESS';
const SET_MESSAGES_ERROR = 'Chatting/SET_MESSAGES_ERROR';

// Action Creating functions

export const addMessage = (message) => {
  return {
    type: ADD_MESSAGE,
    message,
  };
};

export const setChatting = createPromiseThunk(SET_CHATTING, async (param) => {
  let chattingRoom = await getChattingById(param);
  if (!chattingRoom) {
    chattingRoom = await postChatting(param);
  }
  return chattingRoom;
});

export const setMessages = createPromiseThunk(SET_MESSAGES, getMessages);

// Declare Initial state
const initialState = {
  chatting: reducerUtils.createState(),
  messages: reducerUtils.createState([]),
};

// Declare Reducer
export default function Chatting(state = initialState, action) {
  switch (action.type) {
    case ADD_MESSAGE:
      return {
        ...state,
        messages: {
          ...state.messages,
          data: [...state.messages.data, action.message],
        },
      };
    case SET_CHATTING:
      return { ...state, chatting: reducerUtils.loading() };
    case SET_CHATTING_SUCCESS:
      return { ...state, chatting: reducerUtils.success(action.payload) };
    case SET_CHATTING_ERROR:
      return { ...state, chatting: reducerUtils.error(action.error) };
    case SET_MESSAGES:
      return { ...state, messages: reducerUtils.loading() };
    case SET_MESSAGES_SUCCESS:
      return { ...state, messages: reducerUtils.success(action.payload) };
    case SET_MESSAGES_ERROR:
      return { ...state, messages: reducerUtils.error(action.error) };
    default:
      return state;
  }
}
