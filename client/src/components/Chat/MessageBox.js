import OpenColor from 'open-color';
import React from 'react';
import { styled } from 'styled-components';

const Wrapper = styled.div`
  margin-bottom: 1em;
  width: 90%;
  display: flex;
  flex-direction: column;
`;

const FromIdWrapper = styled(Wrapper)`
  align-items: flex-end;
`;
const ToIdWrapper = styled(Wrapper)`
  align-items: flex-start;
`;

const MessageWrapper = styled.div`
  border-radius: 10px;
  color: black;

  height: fit-content;
  width: fit-content;

  position: relative;
  word-break: break-all;

  margin-top: 0.5em;
  padding: 2.5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const FromIdMessage = styled(MessageWrapper)`
  background-color: ${OpenColor.gray[3]};

  :after {
    border-top: 10px solid ${OpenColor.gray[3]};
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 0px solid transparent;
    content: '';

    position: absolute;
    right: 1.5em;
    bottom: -0.7em;
  }
`;

const ToIdMessage = styled(MessageWrapper)`
  background-color: ${OpenColor.gray[4]};

  :after {
    border-top: 10px solid ${OpenColor.gray[4]};
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 0px solid transparent;
    content: '';

    position: absolute;
    left: 1.5em;
    bottom: -0.7em;
  }
`;

const Time = styled.time`
  margin-top: 0.5em;
  color: ${OpenColor.gray[6]};
  font-size: small;
`;

const MessageBox = ({ message, me, receiver }) => {
  if (message.from_id === me.id) {
    return (
      <FromIdWrapper>
        <strong>{me.nickname}</strong>
        <FromIdMessage>
          {message.content}
          <Time dateTime={message.time}>{message.time}</Time>
        </FromIdMessage>
      </FromIdWrapper>
    );
  } else {
    return (
      <ToIdWrapper>
        <strong>{receiver.nickname}</strong>
        <ToIdMessage>
          {message.content}
          <Time dateTime={message.time}>{message.time}</Time>
        </ToIdMessage>
      </ToIdWrapper>
    );
  }
};

export default React.memo(MessageBox);
