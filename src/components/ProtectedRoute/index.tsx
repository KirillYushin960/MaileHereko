import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { userStore } from '@store/UserStore';
import { ReactNode } from 'react';
import { Typography } from '@mui/material';

interface IOwnerRoute {
  children: ReactNode;
}

export const ProtectedRoute = observer(({ children }: IOwnerRoute) => {
  const { user, isLoading } = userStore;

  if (isLoading) {
    return (
      <>
        <Typography variant="h1" sx={{ color: 'white' }}>
          LOADING...
        </Typography>
      </>
    );
  }

  // если залогинен и переходит на логин, редирект
  if (!user?.uid) {
    return <Navigate to="/" replace />;
  }

  return children;
});
