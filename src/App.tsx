import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '@pages/Home';
import Media from '@pages/Media';
import SingleMedia from '@pages/SingleMedia';
import { Layout } from '@layout';
import { ScrollToTop } from '@components/ScrollToTop';
import { pageFilterStore } from '@store/PageFilterStore';
import './index.css';
import { OwnerRoute } from '@components/OwnerRoute';
import Favorites from '@pages/Favorites';

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
          path="/favorites/:userId"
          element={
            <OwnerRoute>
              <Favorites />
            </OwnerRoute>
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
