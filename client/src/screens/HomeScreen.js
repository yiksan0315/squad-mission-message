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
import socket from '../lib/socket';

const Message = styled.p`
  font-size: 2.5em;
  color: ${OpenColor.red[3]};
`;

const HomeScreen = ({ token, onLogout }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function getAccounts() {
      try {
        setIsLoading(true);
        setMessage('loading...');
        const accounts = await getUsers();
        setUsers(accounts);
      } catch (err) {
        setMessage(err.message);
      }
      setIsLoading(false);
    }
    getAccounts();
  }, []);

  const onClick = useCallback(async () => {
    socket.emit('unregister', token.id);
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
            users.map((item, index) => {
              if (item.id !== token.id) {
                return (
                  <UserBox key={index} id={item.id} nickname={item.nickname} />
                );
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
