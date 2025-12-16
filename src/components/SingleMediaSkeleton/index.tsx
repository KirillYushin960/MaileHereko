import { Box, Grid2 as Grid, Skeleton } from '@mui/material';
import { style } from './style';

const renderInfoSkeletons = (count: number) =>
  Array.from({ length: count }, (_, index) => (
    <Grid key={index} justifyContent="flex-start" mb={2} size={{ xs: 12, sm: 6 }}>
      <Skeleton sx={style.infoTitle} />
      <Skeleton sx={style.info} />
    </Grid>
  ));

export const SingleMediaSkeleton = () => (
  <>
    <Skeleton sx={style.banner} />

    <Box sx={style.container}>
      <Skeleton sx={style.image} />

      <Box sx={style.infoContainer}>
        <Skeleton sx={style.title} />

        <Skeleton sx={style.description} />

        <Grid rowSpacing={0}>{renderInfoSkeletons(6)}</Grid>
      </Box>
    </Box>
  </>
);
