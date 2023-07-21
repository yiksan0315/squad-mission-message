import styled from 'styled-components';
import oc from 'open-color';
import { shadow } from '../../utils/StyleUtil';
import React from 'react';

const Wrapper = styled.input`
  width: 50%;

  @media (min-width: 400px) {
    width: 150px;
  }

  margin-top: 1rem;
  margin-bottom: 1rem;
  padding-top: 0.6rem;
  padding-bottom: 0.5rem;

  border-radius: 0.5rem;
  border: none;

  background: ${oc.indigo[6]};
  color: white;

  text-align: center;
  font-size: 1.25rem;
  font-weight: 500;

  cursor: pointer;
  user-select: none;
  transition: 0.2s all;

  &:hover {
    background: ${oc.indigo[9]};
    ${shadow(0)}
  }

  &:active {
    background: ${oc.indigo[7]};
  }
`;

const LoginButton = ({ disabled, isLogin }) => {
  return (
    <Wrapper
      type="submit"
      value={disabled ? 'trying...' : isLogin ? 'Login' : 'Register'}
      disabled={disabled}
    />
  );
};

export default React.memo(LoginButton);
