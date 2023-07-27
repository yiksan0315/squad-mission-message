import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setChatting, setMessages } from '../modules/Chatting';
import { setReceiver } from '../modules/Account';
import { useParams } from 'react-router-dom';
import ChatScreen from '../screens/ChatScreen';

const ChatContainer = ({ token }) => {
  const params = useParams();
  const dispatch = useDispatch();

  const { messages, chatting } = useSelector((state) => {
    return state.Chatting;
  });

  const receiver = useSelector((state) => {
    return state.Account.receiver;
  });

  useEffect(() => {
    dispatch(setReceiver(params.id));
  }, [dispatch, params]);

  useEffect(() => {
    dispatch(
      setChatting({
        from_id: token.id,
        to_id: params.id,
      })
    );
  }, [params, token, dispatch]);

  useEffect(() => {
    if (!chatting.loading && !chatting.error && chatting.data) {
      dispatch(setMessages({ chatting_id: chatting.data._id }));
    }
  }, [chatting, dispatch]);

  return (
    <ChatScreen
      token={token}
      messages={messages}
      chatting={chatting}
      receiver={receiver}
    ></ChatScreen>
  );
};

export default ChatContainer;
