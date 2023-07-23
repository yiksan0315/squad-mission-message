import OpenColor from 'open-color';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { shadow } from '../../utils/StyleUtil';
import React from 'react';

const Wrapper = styled(Link)`
  display: flex;

  width: 100%;
  text-decoration: none;
  color: inherit;

  & + & {
    padding-top: 0.5em;
    padding-bottom: 0.5em;
  }

  &:hover {
    background: ${OpenColor.gray[1]};
    ${shadow(0)}
  }

  &:active {
    background: ${OpenColor.gray[3]};
  }
`;

const UserBox = ({ id, nickname }) => {
  return (
    <Wrapper to={`/chat/${id}`}>
      <p>{`(${id})`}</p>
      <h5>{nickname}</h5>
    </Wrapper>
  );
};

export default React.memo(UserBox);
