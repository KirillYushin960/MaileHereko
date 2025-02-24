import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { userStore } from '@store/UserStore';
import { ReactNode } from 'react';
import { Box, CircularProgress } from '@mui/material';

interface IProtectedRoute {
  children: ReactNode;
  guestOnly?: boolean;
}

export const ProtectedRoute = observer(({ children, guestOnly = false }: IProtectedRoute) => {
  const { user, isLoading } = userStore;

  if (isLoading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );

  if (user?.uid && guestOnly) {
    return <Navigate to="/" replace />;
  }

  if (!user?.uid && !guestOnly) {
    return <Navigate to="/login" replace />;
  }

  return children;
});
