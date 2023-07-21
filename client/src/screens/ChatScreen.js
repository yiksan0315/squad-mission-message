import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { StyledBackground, StyledWindow } from '../styles/BackGroundStyle';
import Header from '../components/Chat/Header';
import ChatBox from '../components/Chat/ChatBox';
import { styled } from 'styled-components';
import OpenColor from 'open-color';
import HeaderButton from '../components/Chat/HeaderButton';

const MessageSendingBox = styled.div`
  display: flex;
  background-color: ${OpenColor.indigo[5]};
  border-radius: 0 0 1em 1em;

  width: 100%;
  height: 10%;
  justify-content: space-evenly;
  align-items: center;
`;

const ChatScreen = ({ token, onLogout }) => {
  const params = useParams();
  const id = params.id;

  const [user, setUser] = useState(null);

  useEffect(() => {});

  const navigate = useNavigate();
  const onClick = () => {
    navigate('/');
  };

  return (
    <StyledWindow>
      <StyledBackground>
        <Header nickname={token.nickname} onLogout={onLogout}>
          <HeaderButton value="back" onClick={onClick} />
        </Header>
        <ChatBox errorMessage="no chating..."></ChatBox>
        <MessageSendingBox>
          <input placeholder="type message..." />
          <input type="button" value=">>" />
        </MessageSendingBox>
      </StyledBackground>
    </StyledWindow>
  );
};

export default ChatScreen;
