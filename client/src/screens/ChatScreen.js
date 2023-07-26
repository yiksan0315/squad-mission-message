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
import MessageBox from '../components/Chat/MessageBox';

const ChatScreen = ({ token }) => {
  const params = useParams();
  const navigate = useNavigate();
  const chatBoxRef = useRef();

  const { messages, chatting } = useSelector((state) => {
    return state.Chatting;
  });

  const receiver = useSelector((state) => {
    return state.Account.receiver;
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

        const messagesObject = await getMessages({
          chatting_id: chattingRoom._id,
        });
        console.log(messagesObject);

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
              return (
                <MessageBox
                  key={item._id}
                  message={item}
                  me={token}
                  receiver={receiver}
                />
              );
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
