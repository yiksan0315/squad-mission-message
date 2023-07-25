import OpenColor from 'open-color';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { shadow } from '../../utils/StyleUtil';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setReceiver } from '../../modules/Account';

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

const UserBox = ({ user }) => {
  const dispatch = useDispatch();

  const onClick = useCallback(() => {
    dispatch(setReceiver(user));
  }, [user, dispatch]);

  return (
    <Wrapper to={`/chat/${user.id}`} onClick={onClick}>
      <p>{`(${user.id})`}</p>
      <h5>{user.nickname}</h5>
    </Wrapper>
  );
};

export default React.memo(UserBox);
