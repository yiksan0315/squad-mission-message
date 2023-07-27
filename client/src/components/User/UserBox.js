import OpenColor from 'open-color';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { shadow } from '../../utils/StyleUtil';
import { BiUserCircle } from 'react-icons/bi';
import React from 'react';

const Wrapper = styled(Link)`
  display: flex;
  align-items: center;
  padding-top: 1.5em;
  padding-bottom: 1.5em;

  width: 100%;
  text-decoration: none;
  color: inherit;

  border-bottom: 1px solid ${OpenColor.gray[1]};

  &:hover {
    background: ${OpenColor.gray[1]};
    ${shadow(0)}
  }

  &:active {
    background: ${OpenColor.gray[3]};
  }
`;

const Nickname = styled.strong`
  margin-left: 0.5em;
  font-size: larger;
  color: ${OpenColor.gray[8]};
`;

const Id = styled.div`
  margin-left: 0.5em;
  font-size: medium;
  color: ${OpenColor.gray[7]};
`;

const UserBox = ({ user }) => {
  return (
    <Wrapper to={`/chat/${user.id}`}>
      <BiUserCircle size={30} color={OpenColor.indigo[5]}></BiUserCircle>
      <Nickname>{`${user.nickname}`}</Nickname>
      <Id>{`(ID : ${user.id})`}</Id>
    </Wrapper>
  );
};

export default React.memo(UserBox);
