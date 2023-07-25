const SET_ACCOUNTS = 'Account/SET_ACCOUNTS';
const SET_RECEIVER = 'Account/SET_RECEIVER';

// Action Creating functions

export const setAccounts = (accounts) => {
  return {
    type: SET_ACCOUNTS,
    accounts,
  };
};

export const setReceiver = (account) => {
  return {
    type: SET_RECEIVER,
    account,
  };
};

// Declare Initial state
const initialState = {
  accounts: [],
  receiver: null,
};

// Declare Reducer
export default function Account(state = initialState, action) {
  switch (action.type) {
    case SET_RECEIVER:
      return { ...state, receiver: action.account };
    case SET_ACCOUNTS:
      return { ...state, accounts: action.accounts };
    default:
      return state;
  }
}
