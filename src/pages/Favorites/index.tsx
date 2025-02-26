/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { Typography, Box, CircularProgress, Grid2 as Grid } from '@mui/material';
import { db } from '@config/firebase';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { userStore } from '@store/UserStore';
import { Card } from '@components/Card';
import NoFavoritesImage from '@assets/no-results.png';

interface FavoriteItem {
  mediaId: string;
  title: string;
  image: string;
  rating: number;
}

const Favorites = () => {
  const { user } = userStore;
  const [favorites, setFavorites] = useState<FavoriteItem[] | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    if (!user) return;

    try {
      setLoading(true);

      const favoritesRef = collection(db, 'favorites');
      const dbQuery = query(
        favoritesRef,
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(dbQuery);

      const userFavorites: FavoriteItem[] = querySnapshot.docs.map((doc) => ({
        mediaId: doc.data().mediaId,
        title: doc.data().title,
        image: doc.data().image,
        rating: doc.data().rating,
      }));

      setFavorites(userFavorites);
    } catch (err) {
      console.error('Error fetchFavorites:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
      <Typography
        sx={{ color: 'white', mt: '80px', mb: '40px', typography: { xs: 'h2', sm: 'h1' } }}
      >
        Favorites
      </Typography>

      {favorites?.length === 0 ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            component="img"
            src={NoFavoritesImage}
            sx={{
              width: '100%',
              height: 'auto',
              maxWidth: '400px',
              maxHeight: '320px',
            }}
          />

          <Typography
            variant="bodyLarge"
            sx={{
              textAlign: 'center',
              color: 'white',
              maxWidth: '1000px',
            }}
          >
            You haven't added anything to your favorites yet
          </Typography>
        </Box>
      ) : (
        <Grid>
          {favorites?.map((favorite) => (
            <Card
              key={favorite.mediaId}
              id={favorite.mediaId}
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
