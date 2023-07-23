import { Route, Routes } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import { useSelector, useDispatch } from 'react-redux';
import { setToken } from './modules/AccessToken';
import { useCallback, useEffect } from 'react';
import { addMessage } from './modules/Chatting';
import socket from './lib/socket';

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

    socket.on('sending', (message) => {
      dispatch(addMessage(message));
    });
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      if (!error && data) {
        socket.emit('register', data.id);
      }
    }
  }, [data, loading, error]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          data ? (
            <HomeScreen token={data} onLogout={onSetToken} />
          ) : (
            <LoginScreen isLoading={loading} onLogin={onSetToken} />
          )
        }
      />
      <Route path="/chat/:id" element={<ChatScreen token={data} />} />
    </Routes>
  );
}

export default App;
