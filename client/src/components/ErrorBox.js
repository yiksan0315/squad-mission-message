import OpenColor from 'open-color';
import React from 'react';
import { styled } from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Message = styled.p`
  font-size: 2.5em;
  color: ${OpenColor.red[3]};
`;

const ErrorBox = (error) => {
  return (
    <Wrapper>
      <Message>{error.message}</Message>
    </Wrapper>
  );
};

export default React.memo(ErrorBox);
