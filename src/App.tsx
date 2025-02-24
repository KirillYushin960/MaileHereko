import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '@pages/Home';
import Media from '@pages/Media';
import SingleMedia from '@pages/SingleMedia';
import { Layout } from '@layout';
import { ScrollToTop } from '@components/ScrollToTop';
import { pageFilterStore } from '@store/PageFilterStore';
import './index.css';
import { ProtectedRoute } from '@components/ProtectedRoute';
import Favorites from '@pages/Favorites';
import Login from '@pages/Login';

const App = () => (
  <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/anime"
          element={<Media key={'Anime'} filter={pageFilterStore.animeFilter} pageName={'Anime'} />}
        />
        <Route
          path="/manga"
          element={<Media key={'Manga'} filter={pageFilterStore.mangaFilter} pageName={'Manga'} />}
        />
        <Route path="media/:id" element={<SingleMedia />} />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
