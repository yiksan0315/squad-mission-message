import { getUserById, getUsers } from '../api/User';
import { createPromiseThunk, reducerUtils } from '../lib/asyncUtils';

// Action Types
const SET_ACCOUNTS = 'Account/SET_ACCOUNTS';
const SET_ACCOUNTS_SUCCESS = 'Account/SET_ACCOUNTS_SUCCESS';
const SET_ACCOUNTS_ERROR = 'Account/SET_ACCOUNTS_ERROR';

const SET_RECEIVER = 'Account/SET_RECEIVER';
const SET_RECEIVER_SUCCESS = 'Account/SET_RECEIVER_SUCCESS';
const SET_RECEIVER_ERROR = 'Account/SET_RECEIVER_ERROR';

// Action Creating functions

export const setAccounts = createPromiseThunk(SET_ACCOUNTS, getUsers);

export const setReceiver = createPromiseThunk(SET_RECEIVER, getUserById);
// Declare Initial state
const initialState = {
  accounts: reducerUtils.createState([]),
  receiver: null,
};

// Declare Reducer
export default function Account(state = initialState, action) {
  switch (action.type) {
    case SET_RECEIVER:
      return { ...state, receiver: reducerUtils.loading() };

    case SET_RECEIVER_SUCCESS:
      return { ...state, receiver: reducerUtils.success(action.payload) };

    case SET_RECEIVER_ERROR:
      return { ...state, receiver: reducerUtils.error(action.error) };

    case SET_ACCOUNTS:
      return { ...state, accounts: reducerUtils.loading(state.accounts.data) };

    case SET_ACCOUNTS_SUCCESS:
      return { ...state, accounts: reducerUtils.success(action.payload) };

    case SET_ACCOUNTS_ERROR:
      return { ...state, accounts: reducerUtils.error(action.error) };
    default:
      return state;
  }
}
