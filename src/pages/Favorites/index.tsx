/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { Typography, Box, CircularProgress, Grid2 as Grid } from '@mui/material';
import { db } from '@config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { userStore } from '@store/UserStore';
import { Card } from '@components/Card';

// общий интерфейс
interface FavoriteItem {
  id: string;
  title: string;
  image: string;
  rating: number;
}

interface FirestoreFavorite {
  title: string;
  image: string;
  rating: number;
  subscribes: string[];
}

const Favorites = () => {
  const { user } = userStore;
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    try {
      if (!user) return;

      setLoading(true);
      const favoritesRef = collection(db, 'favorites');
      const querySnapshot = await getDocs(favoritesRef);

      const userFavorites: FavoriteItem[] = querySnapshot.docs
        .filter((doc) => {
          const { subscribes } = doc.data() as FirestoreFavorite;
          return subscribes?.includes(user.uid);
        })
        .map((doc) => {
          const { id } = doc;
          const { title, image, rating } = doc.data() as FirestoreFavorite;
          return { id, title, image, rating };
        });

      setFavorites(userFavorites);
    } catch (err) {
      console.error('Error fetchFavorites:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;

    fetchFavorites();
  }, [user]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Typography variant="h4" sx={{ color: 'white', mb: 3 }}>
        Favorites
      </Typography>

      {favorites?.length === 0 ? (
        <Typography variant="body1" sx={{ color: 'white' }}>
          no favorites
        </Typography>
      ) : (
        <Grid>
          {favorites?.map((favorite) => (
            <Card
              key={favorite?.id}
              id={favorite?.id}
              title={favorite.title}
              image={favorite.image}
              rating={favorite.rating}
            />
          ))}
        </Grid>
      )}
    </>
  );
};

export default Favorites;
