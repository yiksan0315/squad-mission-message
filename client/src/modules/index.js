import { combineReducers } from 'redux';
import AccessToken from './AccessToken';
import Chatting from './Chatting';
import Account from './Account';

const rootReducer = combineReducers({
  AccessToken,
  Chatting,
  Account,
});

export default rootReducer;
