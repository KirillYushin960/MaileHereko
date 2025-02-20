import { Navigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { userStore } from '@store/UserStore';
import { ReactNode } from 'react';
import { Typography } from '@mui/material';

interface IOwnerRoute {
  children: ReactNode;
}

// ProtectedRoute

export const OwnerRoute = observer(({ children }: IOwnerRoute) => {
  const { userId } = useParams();
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

  if (user?.uid !== userId) {
    return <Navigate to="/" replace />;
  }

  return children;
});
