import React from 'react';
import { StyledBackground, StyledWindow } from '../styles/BackGroundStyle';
import { styled } from 'styled-components';

const Logo = styled.h2`
  letter-spacing: 5px;
  font-size: 2.5em;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin: 0.5em;
`;

const LoginScreen = () => {
  return (
    <StyledWindow>
      <StyledBackground>
        <Logo>SQUAD</Logo>
        <LoginForm
          action="http://localhost.com:5000/api/account/login"
          method="post"
        >
          <Input />
          <Input type="password" />
          <Input type="submit" />
        </LoginForm>
      </StyledBackground>
    </StyledWindow>
  );
};

export default LoginScreen;
