/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { Button, Typography, Box, CircularProgress, Snackbar } from '@mui/material';
import { db } from '@config/firebase';
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { userStore } from '@store/UserStore';

const Favorites = () => {
  const { user } = userStore;
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const fetchFavorites = async () => {
    try {
      if (!user) {
        setError('User not authenticated');
        return;
      }

      const userRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.favorites && Array.isArray(data.favorites)) {
          setFavorites(data.favorites);
        } else {
          await initUserFavorites();
        }
      } else {
        await initUserFavorites();
      }
    } catch (err) {
      console.error('Error fetching favorites:', err);
      setError('Failed to load favorites');
    } finally {
      setLoading(false);
    }
  };

  const initUserFavorites = async () => {
    if (!user) return;

    try {
      await setDoc(doc(db, 'users', user.uid), {
        favorites: [],
      });
      setFavorites([]);
    } catch (err) {
      console.error('Error initializing user:', err);
      setError('Failed to initialize user');
    }
  };

  const handleAddFavorite = async (mediaId: number) => {
    try {
      if (!user) {
        setError('You must be logged in!');
        return;
      }

      const userRef = doc(db, 'users', user.uid);

      const docSnap = await getDoc(userRef);
      if (!docSnap.exists()) {
        await setDoc(userRef, { favorites: [mediaId] });
      } else {
        await updateDoc(userRef, {
          favorites: arrayUnion(mediaId),
        });
      }

      const newData = [...favorites, mediaId];
      setFavorites(newData);
      setSnackbarOpen(true);
    } catch (err) {
      console.error('Error adding favorite:', err);
      setError('Failed to add favorite');
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
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ color: 'white', mb: 3 }}>
        Favorites
      </Typography>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {favorites.length === 0 ? (
        <Typography variant="body1" sx={{ color: 'white' }}>
          no favorites
        </Typography>
      ) : (
        <Box sx={{ display: 'grid', gap: 2 }}>
          {favorites.map((id) => (
            <Box
              key={id}
              sx={{
                p: 2,
                backgroundColor: 'white',
                borderRadius: 1,
              }}
            >
              <Typography>Media ID: {id}</Typography>
            </Box>
          ))}
        </Box>
      )}

      <Button
        variant="contained"
        sx={{ mt: 3 }}
        onClick={() => handleAddFavorite(Math.floor(Math.random() * 100))}
      >
        add random ID
      </Button>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="success!"
      />
    </Box>
  );
};

export default Favorites;
