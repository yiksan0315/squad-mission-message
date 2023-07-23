import React, { useCallback, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { StyledBackground, StyledWindow } from '../styles/BackGroundStyle';
import Header from '../components/Chat/Header';
import ChatBox from '../components/Chat/ChatBox';
import HeaderButton from '../components/Chat/HeaderButton';
import { useSelector } from 'react-redux';
import MessageSendingBox from '../components/Chat/MessageSendingBox';

const ChatScreen = ({ token }) => {
  const params = useParams();
  const navigate = useNavigate();
  const chatBoxRef = useRef();

  const { chattings } = useSelector((state) => {
    return state.Chatting;
  });

  useEffect(() => {
    chatBoxRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [chattings]);

  const onClick = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <StyledWindow>
      <StyledBackground>
        <Header nickname={token.nickname}>
          <HeaderButton value="back" onClick={onClick} />
        </Header>
        <ChatBox errorMessage="no chating...">
          {chattings.map((item) => {
            return <div>{item}</div>;
          })}
          <div ref={chatBoxRef} />
        </ChatBox>
        <MessageSendingBox id={params.id}></MessageSendingBox>
      </StyledBackground>
    </StyledWindow>
  );
};

export default ChatScreen;
