import { Route, Routes } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import { useSelector, useDispatch } from 'react-redux';
import { setToken } from './modules/AccessToken';
import { useCallback, useEffect } from 'react';
import { addMessage } from './modules/Chatting';
import socket, { socketEvent } from './lib/socket';
import NotFound from './screens/NotFound';
import { StyledBackground, StyledWindow } from './styles/BackGroundStyle';
import ChatContainer from './containers/ChatContainer';
import LoadingBox from './components/LoadingBox';
import AccountContainer from './containers/AccountContainer';

function App() {
  const { loading, data, error } = useSelector((state) => {
    return state.AccessToken.token;
  });

  const dispatch = useDispatch();

  const onSetToken = useCallback(() => {
    dispatch(setToken());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setToken());

    socket.on(socketEvent.SEND_MESSAGE, (message) => {
      dispatch(addMessage(message));
    });
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      if (!error && data) {
        socket.emit(socketEvent.REGISTER, data.id);
      }
    }
  }, [data, loading, error]);

  return (
    <StyledWindow>
      <StyledBackground>
        <Routes>
          <Route
            path="/"
            element={
              data ? (
                <AccountContainer token={data} />
              ) : (
                <LoginScreen isLoading={loading} onLogin={onSetToken} />
              )
            }
          />
          <Route
            path="/chat/:id"
            element={
              data ? (
                <ChatContainer token={data} />
              ) : (
                <LoadingBox message={'Loading Token...'} />
              )
            }
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </StyledBackground>
    </StyledWindow>
  );
}

export default App;
