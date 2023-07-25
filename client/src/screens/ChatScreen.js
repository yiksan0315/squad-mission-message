import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { StyledBackground, StyledWindow } from '../styles/BackGroundStyle';
import Header from '../components/Chat/Header';
import ChatBox from '../components/Chat/ChatBox';
import HeaderButton from '../components/Chat/HeaderButton';
import { useDispatch, useSelector } from 'react-redux';
import MessageSendingBox from '../components/Chat/MessageSendingBox';
import { getChattingById, getMessages, postChatting } from '../api/Chatting';
import { setChatting, setMessages } from '../modules/Chatting';

const ChatScreen = ({ token }) => {
  const params = useParams();
  const navigate = useNavigate();
  const chatBoxRef = useRef();

  const { messages, chatting } = useSelector((state) => {
    return state.Chatting;
  });

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMessage = async () => {
      try {
        const request = {
          from_id: token.id,
          to_id: params.id,
        };
        let chattingRoom = await getChattingById(request);
        if (!chattingRoom) {
          chattingRoom = await postChatting(request);
        }

        const temp = await getMessages({
          from_id: token.id,
          chatting_id: chattingRoom._id,
        });
        const messagesObject = [...temp.from_id, ...temp.to_id];

        dispatch(setChatting(chattingRoom));
        dispatch(setMessages(messagesObject));
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    loadMessage();
  }, [params.id, token.id, dispatch]);

  useEffect(() => {
    chatBoxRef.current.scrollIntoView({ behavior: 'smooth' });
    console.log('!!');
  }, [messages, isLoading]);

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
          {isLoading ? (
            <div>loading...</div>
          ) : (
            messages.map((item) => {
              return <div>{item.content}</div>;
            })
          )}
          <div ref={chatBoxRef} />
        </ChatBox>
        {isLoading || (
          <MessageSendingBox
            chatting_id={chatting._id}
            from_id={token.id}
            to_id={params.id}
          ></MessageSendingBox>
        )}
      </StyledBackground>
    </StyledWindow>
  );
};

export default ChatScreen;
