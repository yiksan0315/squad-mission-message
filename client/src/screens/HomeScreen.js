import React, { useCallback, useEffect, useState } from 'react';
import { StyledBackground, StyledWindow } from '../styles/BackGroundStyle';
import { styled } from 'styled-components';
import OpenColor from 'open-color';
import { getUsers } from '../api/User';
import UserBox from '../components/User/UserBox';
import Header from '../components/Chat/Header';
import ChatBox from '../components/Chat/ChatBox';
import HeaderButton from '../components/Chat/HeaderButton';
import { logout } from '../api/Login';
import socket, { socketEvent } from '../lib/socket';
import { useDispatch, useSelector } from 'react-redux';
import { setAccounts } from '../modules/Account';

const Message = styled.p`
  font-size: 2.5em;
  color: ${OpenColor.red[3]};
`;

const HomeScreen = ({ token, onLogout }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const accounts = useSelector((state) => {
    return state.Account.accounts;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    async function getAccounts() {
      try {
        setIsLoading(true);
        setMessage('loading...');
        const accountsObject = await getUsers();
        dispatch(setAccounts(accountsObject));
      } catch (err) {
        setMessage(err.message);
      }
      setIsLoading(false);
    }
    getAccounts();
  }, [dispatch]);

  const onClick = useCallback(async () => {
    socket.emit(socketEvent.UNREGISTER, token.id);
    await logout(onLogout);
  }, [onLogout, token]);

  return (
    <StyledWindow>
      <StyledBackground>
        <Header nickname={token.nickname}>
          <HeaderButton value="Log Out" onClick={onClick} />
        </Header>
        <ChatBox>
          {isLoading ? (
            <Message>{message}</Message>
          ) : (
            accounts.map((item) => {
              if (item.id !== token.id) {
                return <UserBox key={item._id} user={item} />;
              } else {
                return <></>;
              }
            })
          )}
        </ChatBox>
      </StyledBackground>
    </StyledWindow>
  );
};

export default HomeScreen;
