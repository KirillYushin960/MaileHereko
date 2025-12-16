import { Box, ImageListItem, ImageListItemBar, Link } from '@mui/material';
import { GetSingleMediaQuery } from '@generated/types';
import ImagePlaceholder from '@assets/Image-placeholder.png';
import { style } from './style';

interface IEpisodeItem {
  episode: NonNullable<NonNullable<GetSingleMediaQuery['Media']>['streamingEpisodes']>[number];
}

export const EpisodeItem = ({ episode }: IEpisodeItem) => {
  const content = (
    <ImageListItem sx={style.container}>
      <Box
        component="img"
        src={episode?.thumbnail || ImagePlaceholder}
        alt={`${episode?.title} preview`}
        sx={style.image}
      />

      <ImageListItemBar sx={style.text} title={episode?.title} />
    </ImageListItem>
  );

  return episode?.url ? (
    <Link
      href={episode.url}
      target="_blank"
      rel="noopener noreferrer"
      sx={{ textDecoration: 'none' }}
    >
      {content}
    </Link>
  ) : (
    content
  );
};
