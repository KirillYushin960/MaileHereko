import { ReactNode } from 'react';
import { Typography } from '@mui/material';
import { style } from './style';
import { SingleMediaSkeleton } from '@components/SingleMediaSkeleton';
import { ApolloError } from '@apollo/client';

interface IRenderSingleMedia {
  loading: boolean;
  error?: ApolloError;
  children: ReactNode;
}

export const RenderSingleMedia = ({ loading, error, children }: IRenderSingleMedia) => {
  if (loading) {
    return <SingleMediaSkeleton />;
  }

  if (error) {
    return (
      <Typography variant="h3" sx={style.utilityText}>
        Loading error
      </Typography>
    );
  }

  return <>{children}</>;
};
