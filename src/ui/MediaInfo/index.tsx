import { Grid2, Typography } from '@mui/material';
import { style } from './style';

type Size = {
  [key in 'xs' | 'sm' | 'md' | 'lg' | 'xl']?: number;
};

interface IMediaInfo {
  title: string;
  description: string | number;
  size: Size | number;
}

export const MediaInfo = ({ title, description, size }: IMediaInfo) => (
  <Grid2 sx={style.container} size={size}>
    <Typography variant="bodyRegular" sx={style.title}>
      {title}
    </Typography>

    <Typography variant="bodyLarge" sx={style.description}>
      {description}
    </Typography>
  </Grid2>
);
