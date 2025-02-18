import { SxProps, Theme } from '@mui/material';
import { theme } from '@theme';

interface StyleProps {
  media: SxProps<Theme>;
  image: SxProps<Theme>;
  info: SxProps<Theme>;
  infoTitle: SxProps<Theme>;
  infoDescription: SxProps<Theme>;
  rating: SxProps<Theme>;
}

export const style: StyleProps = {
  media: {
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

  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },

  infoTitle: {
    color: theme.palette.customGray[50],
  },

  infoDescription: {
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
};
