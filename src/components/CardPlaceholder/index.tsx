import { Box, Skeleton } from '@mui/material';
import { style } from './style';

export const CardPlaceholder = () => (
  <Box sx={style.container}>
    <Skeleton sx={style.rating} />
    <Skeleton sx={style.image} />
    <Skeleton sx={style.title} />
  </Box>
);
