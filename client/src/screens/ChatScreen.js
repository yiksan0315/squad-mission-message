import React, { useCallback, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Chat/Header';
import ChatBox from '../components/Chat/ChatBox';
import HeaderButton from '../components/Chat/HeaderButton';
import MessageSendingBox from '../components/Chat/MessageSendingBox';
import MessageBox from '../components/Chat/MessageBox';
import LoadingBox from '../components/LoadingBox';

const ChatScreen = ({ token, messages, chatting, receiver }) => {
  const params = useParams();
  const chatBoxRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    chatBoxRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages.data]);

  const onClick = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <>
      <Header nickname={token.nickname}>
        <HeaderButton value="back" onClick={onClick} />
      </Header>
      <ChatBox>
        {messages.loading || chatting.loading ? (
          <LoadingBox message={'loading chattings...'} />
        ) : (
          messages.data.map((item) => {
            return (
              <MessageBox
                key={item._id}
                message={item}
                me={token}
                receiver={receiver.data}
              />
            );
          })
        )}
        <div ref={chatBoxRef} />
      </ChatBox>
      {messages.loading || !chatting.data ? (
        <></>
      ) : (
        <MessageSendingBox
          chatting_id={chatting.data._id}
          from_id={token.id}
          to_id={params.id}
        ></MessageSendingBox>
      )}
    </>
  );
};

export default React.memo(ChatScreen);
