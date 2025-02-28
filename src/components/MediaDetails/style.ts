import { SxProps, Theme } from '@mui/material';
import { theme } from '@theme';

interface StyleProps {
  container: SxProps<Theme>;
  image: SxProps<Theme>;
  description: SxProps<Theme>;
  rating: SxProps<Theme>;
  episodesContainer: SxProps<Theme>;
  episodesHeader: SxProps<Theme>;
  episodesList: SxProps<Theme>;
  showMore: SxProps<Theme>;
  ratingContainer: SxProps<Theme>;
  infoContainer: SxProps<Theme>;
  infoSection: SxProps<Theme>;
  subscribeButton: SxProps<Theme>;
  subscribeButtonSkeleton: SxProps<Theme>;
  showMoreEpisodes: SxProps<Theme>;
}

export const style: StyleProps = {
  container: {
    mt: { xs: '102px', sm: '152px' },
    width: '100%',
    maxWidth: '1040px',
    mx: 'auto',
  },

  image: {
    width: { xs: '100%', sm: '240px', md: '360px', lg: '480px' },
    objectFit: 'contain',
    objectPosition: 'center',
    borderRadius: '24px',
    float: { xs: 'none', sm: 'left' },
    marginRight: { xs: '0px', sm: '24px', md: '40px', lg: '80px' },
    marginBottom: { xs: '16px', md: '24px', lg: '40px' },
    display: { xs: 'flex', sm: 'block' },
    flexDirection: 'column',
  },

  description: {
    color: theme.palette.customGray[300],
    whiteSpace: 'pre-line',
    '& a': {
      color: theme.palette.customGray[50],
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },

  ratingContainer: {
    my: '24px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '24px',
    clear: 'none',
  },

  rating: { height: '32px', width: '60px' },

  subscribeButton: { height: '32px' },

  subscribeButtonSkeleton: {
    width: '240px',
    height: '32px',
    borderRadius: '24px',
    backgroundColor: theme.palette.customGray[800],
    transform: 'none',
  },

  showMore: {
    color: theme.palette.customGray[50],
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.customGray[100],
    },
    ml: '4px',
  },

  infoContainer: { display: 'flex', flexWrap: 'wrap', gap: '24px', clear: 'none', mb: '24px' },

  infoSection: { display: 'flex', gap: '24px', flexWrap: 'wrap' },

  episodesContainer: { display: 'flex', flexDirection: 'column', gap: '8px', clear: 'both' },

  episodesHeader: {
    color: theme.palette.customGray[400],
    display: 'block',
  },

  episodesList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '16px',
    mb: '32px',
  },

  showMoreEpisodes: {
    width: '200px',
    alignSelf: 'center',
    height: '32px',
    mb: '32px',
    mt: '-16px',
  },
};
