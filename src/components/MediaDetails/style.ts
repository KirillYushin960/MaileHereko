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
}

export const style: StyleProps = {
  container: {
    mt: { xs: '102px', sm: '152px' },
    width: '100%',
    maxWidth: '1120px',
    ml: 'auto',
    display: 'flex',
    justifyContent: { xs: 'center', sm: 'flex-start' },
  },

  image: {
    width: '100%',
    objectFit: 'contain',
    objectPosition: 'center',
    borderRadius: '24px',
    maxWidth: '480px',
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

  rating: { height: '32px', width: '60px' },

  episodesContainer: { display: 'flex', flexDirection: 'column', gap: '8px' },

  episodesHeader: {
    color: theme.palette.customGray[400],
  },

  episodesList: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    height: { xs: '520px', sm: '690px' },
    borderRadius: { xs: '8px', sm: '12px', md: '24px' },
    backgroundColor: 'transparent',
  },
};
