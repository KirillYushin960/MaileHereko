import { RefObject } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Card as MuiCard,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { style } from './style';
import ImagePlaceholder from '@assets/Image-placeholder.png';
import { Rating } from '@ui/Rating';

interface ICard {
  id: number;
  ref: RefObject<HTMLDivElement | null> | null;
  title: string;
  rating?: number | null;
  image?: string | null;
}

export const Card = ({ id, rating, image, title, ref }: ICard) => (
  <Box component={Link} to={`/media/${id}`} sx={style.container}>
    <MuiCard sx={style.card} ref={ref}>
      {rating && <Rating number={rating} sxStyle={style.rating} />}

      <Box sx={style.backgroundOverlay(image, ImagePlaceholder)} />

      <CardActionArea>
        <CardMedia component="img" image={image || ImagePlaceholder} alt="img" sx={style.media} />

        <CardContent sx={style.content}>
          <Typography variant="linkRegular" sx={style.title}>
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </MuiCard>
  </Box>
);
