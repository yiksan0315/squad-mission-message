import OpenColor from 'open-color';
import React from 'react';
import { styled } from 'styled-components';

const MessageWrapper = styled.div`
  width: 100%;
  height: fit-content;

  border-top: solid 1px grey;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FromIdWrapper = styled(MessageWrapper)`
  background-color: ${OpenColor.white[5]};
  align-items: flex-end;
`;

const ToIdWrapper = styled(MessageWrapper)`
  background-color: ${OpenColor.gray[1]};
  align-items: flex-start;
`;

const MessageBox = ({ message, me, receiver }) => {
  if (message.from_id === me.id) {
    return (
      <FromIdWrapper>
        <strong>{me.nickname}</strong>
        <p>{message.content}</p>
        <div>{message.time}</div>
      </FromIdWrapper>
    );
  } else {
    return (
      <ToIdWrapper>
        <strong>{receiver.nickname}</strong>
        <p>{message.content}</p>
        <div>{message.time}</div>
      </ToIdWrapper>
    );
  }
};

export default React.memo(MessageBox);
