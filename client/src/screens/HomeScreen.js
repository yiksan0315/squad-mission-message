import React, { useCallback } from 'react';
import UserBox from '../components/User/UserBox';
import Header from '../components/Chat/Header';
import ChatBox from '../components/Chat/ChatBox';
import HeaderButton from '../components/Chat/HeaderButton';
import { logout } from '../api/Login';
import socket, { socketEvent } from '../lib/socket';
import { useDispatch } from 'react-redux';
import { setToken } from '../modules/AccessToken';

const HomeScreen = ({ token, accounts }) => {
  const dispatch = useDispatch();

  const onClick = useCallback(async () => {
    socket.emit(socketEvent.UNREGISTER, token.id);
    await logout(() => {
      dispatch(setToken());
    });
  }, [token, dispatch]);

  return (
    <>
      <Header nickname={token.nickname}>
        <HeaderButton value={'Logout'} onClick={onClick} />
      </Header>
      <ChatBox>
        {accounts.map((item) => {
          if (item.id !== token.id) {
            return <UserBox key={item._id} user={item} />;
          } else {
            return <div key={item._id} />;
          }
        })}
      </ChatBox>
    </>
  );
};

export default React.memo(HomeScreen);
