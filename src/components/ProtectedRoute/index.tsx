import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { userStore } from '@store/UserStore';
import { ReactNode } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { style } from './style';

interface IProtectedRoute {
  children: ReactNode;
  guestOnly?: boolean;
}

export const ProtectedRoute = observer(({ children, guestOnly = false }: IProtectedRoute) => {
  const { user, isLoading, setSighIn } = userStore;

  if (isLoading)
    return (
      <Box sx={style.load}>
        <CircularProgress />
      </Box>
    );

  if (user?.uid && guestOnly) {
    return <Navigate to="/" replace />;
  }

  if (!user?.uid && !guestOnly) {
    setSighIn();
    return <Navigate to="/login" replace />;
  }

  return children;
});
