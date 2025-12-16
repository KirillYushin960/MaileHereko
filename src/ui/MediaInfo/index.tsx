import { Box, Typography } from '@mui/material';
import { style } from './style';

interface IMediaInfo {
  title: string;
  description: string | number;
}

export const MediaInfo = ({ title, description }: IMediaInfo) => (
  <Box sx={style.container}>
    <Typography variant="bodyRegular" sx={style.title}>
      {title}
    </Typography>

    <Typography variant="bodyLarge" sx={style.description}>
      {description}
    </Typography>
  </Box>
);
