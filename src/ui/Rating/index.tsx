import { Box, SxProps, Theme, Typography } from '@mui/material';
import { style } from './style';
import IconStar from '@assets/icons/star.svg';

interface IRating {
  number: number;
  sxStyle?: SxProps<Theme>;
}

export const Rating = ({ number, sxStyle }: IRating) => (
  <Box sx={() => ({ ...style.ratingContainer, ...sxStyle })}>
    <Box component="img" src={IconStar} draggable="false" alt="star" sx={style.starImage} />

    <Typography variant="bodyRegular" sx={style.rating}>
      {number && number / 10}
    </Typography>
  </Box>
);
