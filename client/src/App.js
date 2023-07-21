import { Route, Routes } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import { useSelector, useDispatch } from 'react-redux';
import { setToken } from './modules/AccessToken';
import { useEffect } from 'react';

function App() {
  const { loading, data, error } = useSelector((state) => {
    return state.AccessToken.token;
  });
  const dispatch = useDispatch();

  const onSetToken = () => {
    dispatch(setToken());
  };

  useEffect(() => {
    dispatch(setToken());
  }, [dispatch]);

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
      <Route
        path="/chat/:id"
        element={<ChatScreen token={data} onLogout={onSetToken} />}
      />
    </Routes>
  );
}

export default App;
