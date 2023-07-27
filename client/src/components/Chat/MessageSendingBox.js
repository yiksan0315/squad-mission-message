import OpenColor from 'open-color';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { styled } from 'styled-components';
import socket, { socketEvent } from '../../lib/socket';
import { postMessage } from '../../api/Chatting';
import { addMessage } from '../../modules/Chatting';
import { BsSendFill } from 'react-icons/bs';
import { shadow } from '../../utils/StyleUtil';

const Wrapper = styled.form`
  display: flex;
  background-color: ${OpenColor.indigo[5]};
  border-radius: 0 0 1em 1em;

  width: 100%;
  height: 10%;
  justify-content: space-between;
  align-items: center;
`;

const InputWrapper = styled.input`
  margin-left: 1em;
  margin-right: 1em;
  width: inherit;
  height: 70%;

  border: 1px solid ${OpenColor.gray[3]};
  border-radius: 2em;
  line-height: 2.5rem;
  font-size: 1rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

const Send = styled(BsSendFill)`
  margin-right: 1em;

  border-radius: 20%;
  padding: 1%;

  &:hover {
    background: ${OpenColor.indigo[9]};
    ${shadow(0)}
  }

  &:active {
    background: ${OpenColor.indigo[2]};
  }
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
          const content = message;
          setMessage('');
          const messageObject = await postMessage({
            chatting_id,
            from_id,
            content,
          });
          socket.emit(socketEvent.REPLY_MESSAGE, to_id, messageObject);
          dispatch(addMessage(messageObject));
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
      <InputWrapper
        placeholder="type message..."
        value={message}
        onChange={onChange}
        ref={messageInput}
      />
      <Send size="2em" onClick={onSubmit}>
        <input type="submit" />
      </Send>
    </Wrapper>
  );
};

export default React.memo(MessageSendingBox);
