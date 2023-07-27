import OpenColor from 'open-color';
import React from 'react';
import { styled } from 'styled-components';
import { SyncLoader } from 'react-spinners';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Message = styled.p`
  font-size: 1.5em;
  color: ${OpenColor.indigo[3]};
`;

const LoadingBox = ({ message }) => {
  return (
    <Wrapper>
      <Message>{message}</Message>
      <SyncLoader color={OpenColor.indigo[5]} />
    </Wrapper>
  );
};

export default React.memo(LoadingBox);
