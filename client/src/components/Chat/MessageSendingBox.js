import OpenColor from 'open-color';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { styled } from 'styled-components';
import { addMessage } from '../../modules/Chatting';
import socket from '../../lib/socket';

const Wrapper = styled.form`
  display: flex;
  background-color: ${OpenColor.indigo[5]};
  border-radius: 0 0 1em 1em;

  width: 100%;
  height: 10%;
  justify-content: space-evenly;
  align-items: center;
`;

const MessageSendingBox = ({ id }) => {
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
      if (message) {
        socket.emit('reply', id, message);
        dispatch(addMessage(message));
      }
      messageInput.current.focus();
    },
    [id, message, dispatch]
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
