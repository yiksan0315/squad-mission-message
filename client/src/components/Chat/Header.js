import React from 'react';
import { styled } from 'styled-components';
import OpenColor from 'open-color';
import { shadow } from '../../utils/StyleUtil';

const Wrapper = styled.div`
  display: flex;
  background-color: ${OpenColor.indigo[5]};
  border-radius: 1em 1em 0 0;
  ${shadow(0)}

  width: 100%;
  height: 10%;
  justify-content: space-between;
  align-items: center;
`;

const Nickname = styled.strong`
  margin-left: 0.5em;
  color: ${OpenColor.gray[1]};
  font-size: 1.5em;
`;

const Header = ({ children, nickname }) => {
  return (
    <Wrapper>
      <Nickname>{nickname}</Nickname>
      {children}
    </Wrapper>
  );
};

export default React.memo(Header);
