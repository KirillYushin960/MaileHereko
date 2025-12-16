import Home from '@pages/Home';
import Login from '@pages/Login';
import Media from '@pages/Media';
import Favorites from '@pages/Favorites';
import SingleMedia from '@pages/SingleMedia';
import Registration from '@pages/Registration';
import NotFound from '@pages/NotFound';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from '@layout';
import { ScrollToTop } from '@components/ScrollToTop';
import { ProtectedRoute } from '@components/ProtectedRoute';
import { pageFilterStore } from '@store/PageFilterStore';
import './index.css';

const App = () => (
  <BrowserRouter>
    <ScrollToTop />

    <Routes>
      <Route element={<Layout />}>
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
          path="/login"
          element={
            <ProtectedRoute guestOnly>
              <Login />
            </ProtectedRoute>
          }
        />

        <Route
          path="/registration"
          element={
            <ProtectedRoute guestOnly>
              <Registration />
            </ProtectedRoute>
          }
        />

        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
