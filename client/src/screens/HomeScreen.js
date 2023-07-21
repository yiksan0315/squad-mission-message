import React, { useEffect, useState } from 'react';
import { StyledBackground, StyledWindow } from '../styles/BackGroundStyle';
import { styled } from 'styled-components';
import OpenColor from 'open-color';
import { getUsers } from '../api/User';
import UserBox from '../components/User/UserBox';
import Header from '../components/Chat/Header';
import ChatBox from '../components/Chat/ChatBox';
import HeaderButton from '../components/Chat/HeaderButton';
import { logout } from '../api/Login';

const Message = styled.p`
  font-size: 1.5em;
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

  const onClick = async () => {
    await logout(onLogout);
  };

  return (
    <StyledWindow>
      <StyledBackground>
        <Header nickname={token.nickname}>
          <HeaderButton value="Log Out" onClick={onClick} />
        </Header>
        <ChatBox>
          {!users || isLoading ? (
            <Message>{message}</Message>
          ) : (
            users.map((item) => {
              if (item.id !== token.id) {
                return (
                  <UserBox
                    id={item.id}
                    nickname={item.nickname}
                    key={item.id}
                  />
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

export default React.memo(HomeScreen);
