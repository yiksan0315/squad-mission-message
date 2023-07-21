import { check } from '../api/Login';
import { getCookie, removeCookie } from '../utils/Cookie';

// Action types
const SET_TOKEN = 'AcessToken/SET_TOKEN';
const SET_TOKEN_SUCCESS = 'AcessToken/SET_TOKEN_SUCCESS';
const SET_TOKEN_ERROR = 'AcessToken/SET_TOKEN_ERROR';

// Action Creating functions
export const setToken = () => async (dispatch) => {
  const TOKEN_NAME = 'AccessToken';

  dispatch({ type: SET_TOKEN });
  try {
    const token = getCookie(TOKEN_NAME);
    if (!token) {
      throw new Error('no cookie...');
    }
    const decoded = await check(token);
    dispatch({ type: SET_TOKEN_SUCCESS, decoded });
  } catch (err) {
    console.log(err.message);
    removeCookie(TOKEN_NAME);
    dispatch({ type: SET_TOKEN_ERROR, error: err });
  }
};

// Declare Initial state
const initialState = {
  token: { loading: false, data: null, error: null },
};

// Declare Reducer
export default function AccessToken(state = initialState, action) {
  switch (action.type) {
    case SET_TOKEN:
      return { token: { loading: true, data: null, error: null } };
    case SET_TOKEN_SUCCESS:
      return { token: { loading: false, data: action.decoded, error: null } };
    case SET_TOKEN_ERROR:
      return { token: { loading: false, data: null, error: action.error } };
    default:
      return state;
  }
}
