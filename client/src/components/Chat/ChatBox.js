import OpenColor from 'open-color';
import React from 'react';
import { styled } from 'styled-components';

const ChatWrapper = styled.div`
  width: 100%;
  height: 90%;
  background-color: ${OpenColor.white[5]};

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  overflow-y: scroll;
`;

const ChatBox = ({ children, errorMessage }) => {
  if (!children) {
    return <ChatWrapper>{errorMessage}</ChatWrapper>;
  }
  return <ChatWrapper>{children}</ChatWrapper>;
};

export default React.memo(ChatBox);
