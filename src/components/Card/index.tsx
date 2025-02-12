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
import IconStar from '@assets/icons/star.svg';

interface ICard {
  title: string | null | undefined;
  rating: number | null | undefined;
  image: string | null | undefined;
}

export const Card = ({ rating, image, title }: ICard) => (
  <MuiCard sx={style.card}>
    {rating && (
      <Box sx={style.ratingContainer}>
        <img src={IconStar} draggable="false" alt="star" style={{ height: '16px' }} />

        <Typography variant="bodyRegular" sx={style.rating}>
          {rating / 10}
        </Typography>
      </Box>
    )}

    <Box sx={style.backgroundOverlay(image, ImagePlaceholder)} />

    <CardActionArea>
      <CardMedia component="img" image={image || ImagePlaceholder} alt="img" sx={style.cardMedia} />

      <CardContent sx={style.cardContent}>
        <Typography variant="linkRegular" sx={style.cardTitle}>
          {title}
        </Typography>
      </CardContent>
    </CardActionArea>
  </MuiCard>
);
