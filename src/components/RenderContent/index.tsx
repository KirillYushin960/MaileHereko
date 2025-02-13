import { ReactNode } from 'react';
import { Grid2 as Grid, Typography } from '@mui/material';
import { CardPlaceholderCollection } from '@ui/CardPlaceholderCollection';
import { style } from './style';

interface IRenderContent {
  loading: boolean;
  error: boolean;
  count?: number | null;
  children: ReactNode;
}

export const RenderContent = ({ loading, error, count, children }: IRenderContent) => (
  <Grid>
    {count === 0 && (
      <Typography variant="h3" sx={style.utilityText}>
        There are no matches
      </Typography>
    )}

    {children}

    {loading && <CardPlaceholderCollection />}

    {!loading && error && (
      <Typography variant="h3" sx={style.utilityText}>
        Loading error
      </Typography>
    )}
  </Grid>
);
