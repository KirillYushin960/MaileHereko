import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import { Layout } from '@layout';
import Anime from '@pages/Anime';
import Manga from '@pages/Manga';
import Home from '@pages/Home';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/anime" element={<Anime />} />
        <Route path="/manga" element={<Manga />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
