import { check } from '../api/Login';
import { reducerUtils } from '../lib/asyncUtils';
import { getCookie, removeCookie } from '../utils/Cookie';

// Action Types
const SET_TOKEN = 'AccessToken/SET_TOKEN';
const SET_TOKEN_SUCCESS = 'AccessToken/SET_TOKEN_SUCCESS';
const SET_TOKEN_ERROR = 'AccessToken/SET_TOKEN_ERROR';

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
    dispatch({ type: SET_TOKEN_SUCCESS, payload: decoded });
  } catch (err) {
    console.log(err.message);
    removeCookie(TOKEN_NAME);
    dispatch({ type: SET_TOKEN_ERROR, error: err });
  }
};

// Declare Initial state
const initialState = {
  token: reducerUtils.createState(),
};

// Declare Reducer
export default function AccessToken(state = initialState, action) {
  switch (action.type) {
    case SET_TOKEN:
      return { token: reducerUtils.loading() };
    case SET_TOKEN_SUCCESS:
      return { token: reducerUtils.success(action.payload) };
    case SET_TOKEN_ERROR:
      return { token: reducerUtils.error(action.error) };
    default:
      return state;
  }
}
