import { ReactNode } from 'react';
import { renderPlaceholders } from '@helpers';
import { Grid2 as Grid, Typography } from '@mui/material';
import { style } from './style';

interface IRenderContent {
  loading: boolean;
  error: boolean;
  count?: number | null;
  children: ReactNode;
}

export const RenderContent = ({ loading, error, count, children }: IRenderContent) => (
  <>
    {count === 0 && (
      <Typography variant="h3" sx={style.utilityText}>
        There are no matches
      </Typography>
    )}

    <Grid>
      {children}

      {loading && renderPlaceholders(4)}
    </Grid>

    {!loading && error && (
      <Typography variant="h3" sx={style.utilityText}>
        Loading error
      </Typography>
    )}
  </>
);
