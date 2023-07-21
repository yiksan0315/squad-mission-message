import React, { useCallback, useState } from 'react';
import { StyledBackground, StyledWindow } from '../styles/BackGroundStyle';
import { styled } from 'styled-components';
import LoginInput from '../components/Login/LoginInput';
import LoginButton from '../components/Login/LoginButton';
import OpenColor from 'open-color';
import { login, register } from '../api/Login';

const LoginLogo = styled.h2`
  letter-spacing: 5px;
  font-size: 2.5em;
`;

const LoginForm = styled.form`
  width: 75%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginMessage = styled.p`
  color: ${OpenColor.red[3]};
`;

const LoginLink = styled.p`
  &:hover {
    color: ${OpenColor.indigo[5]};
  }
  margin: 0 0 1em 0;
`;

const LoginScreen = ({ isLoading, onLogin }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');

  const [message, setMessage] = useState('');

  const [isLogin, setIsLogin] = useState(true);
  const onClickIsLogin = useCallback(() => {
    setIsLogin((prevState) => !prevState);
    setMessage('');
  }, []);

  const [disabled, setDisabled] = useState(false);
  const onSubmit = useCallback(
    async (event) => {
      setDisabled(true);
      event.preventDefault();

      try {
        if (isLogin) {
          await login({ id, password }, onLogin);
        } else {
          await register({ id, password, nickname }, (message) => {
            setMessage(message);
          });
        }
      } catch (err) {
        setMessage(err.message);
      }
      setDisabled(false);
    },
    [isLogin, id, password, nickname, onLogin]
  );

  if (isLoading) {
    return (
      <StyledWindow>
        <StyledBackground>
          <LoginLogo>SQUAD</LoginLogo>
          <LoginMessage>Loading...</LoginMessage>;
        </StyledBackground>
      </StyledWindow>
    );
  } else {
    return (
      <StyledWindow>
        <StyledBackground>
          <LoginLogo>SQUAD</LoginLogo>
          <LoginForm onSubmit={onSubmit}>
            <LoginInput
              label="id"
              value={id}
              onChange={(e) => {
                setId((prev) => {
                  return e.target.value;
                });
              }}
            />
            <LoginInput
              label="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword((prev) => {
                  return e.target.value;
                });
              }}
            />
            {isLogin ? (
              <div />
            ) : (
              <LoginInput
                label="nickname"
                value={nickname}
                onChange={(e) => {
                  setNickname((prev) => {
                    return e.target.value;
                  });
                }}
              />
            )}
            <LoginMessage>{message}</LoginMessage>
            <LoginButton disabled={disabled} isLogin={isLogin} />
          </LoginForm>
          <LoginLink onClick={onClickIsLogin}>
            {isLogin ? 'register' : 'login'}
          </LoginLink>
        </StyledBackground>
      </StyledWindow>
    );
  }
};

export default LoginScreen;
