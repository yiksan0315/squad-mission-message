import { combineReducers } from 'redux';
import AccessToken from './AccessToken';
import Chatting from './Chatting';

const rootReducer = combineReducers({
  AccessToken,
  Chatting,
});

export default rootReducer;
