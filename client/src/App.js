import { Route, Routes } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginScreen />} />
    </Routes>
  );
}

export default App;
