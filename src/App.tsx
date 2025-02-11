import { Route, Routes } from 'react-router-dom';
import './index.css';
import { Layout } from './layout';
import Anime from './pages/Anime';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Anime />} />
      </Route>
    </Routes>
  );
}

export default App;
