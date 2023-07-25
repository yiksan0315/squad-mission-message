import OpenColor from 'open-color';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { styled } from 'styled-components';
import socket, { socketEvent } from '../../lib/socket';
import { postMessage } from '../../api/Chatting';
import { addMessage } from '../../modules/Chatting';

const Wrapper = styled.form`
  display: flex;
  background-color: ${OpenColor.indigo[5]};
  border-radius: 0 0 1em 1em;

  width: 100%;
  height: 10%;
  justify-content: space-evenly;
  align-items: center;
`;

const MessageSendingBox = ({ chatting_id, from_id, to_id }) => {
  const dispatch = useDispatch();
  const messageInput = useRef();

  useEffect(() => {
    messageInput.current.focus();
  }, []);

  const [message, setMessage] = useState('');
  const onChange = useCallback((e) => {
    setMessage(e.target.value);
  }, []);

  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        if (message) {
          await postMessage({ chatting_id, from_id, content: message });
          socket.emit(socketEvent.REPLY_MESSAGE, to_id, message);
          dispatch(addMessage({ from_id, chatting_id, message }));
        }
        messageInput.current.focus();
      } catch (err) {
        console.log(err.message);
      }
    },
    [chatting_id, from_id, to_id, message, dispatch]
  );

  return (
    <Wrapper onSubmit={onSubmit}>
      <input
        placeholder="type message..."
        value={message}
        onChange={onChange}
        ref={messageInput}
      />
      <input type="submit" value=">>" />
    </Wrapper>
  );
};

export default React.memo(MessageSendingBox);
