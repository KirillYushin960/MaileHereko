import { SxProps, Theme } from '@mui/material';
import { theme } from '@theme';

interface StyleProps {
  container: SxProps<Theme>;
  image: SxProps<Theme>;
  text: SxProps<Theme>;
}

export const style: StyleProps = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
  },

  image: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
    aspectRatio: '16/9',
  },

  text: {
    '& .MuiImageListItemBar-title': {
      color: theme.palette.customGray[50],
      fontFamily: 'Poppins',
      fontSize: '20px',
      lineHeight: '32px',
      fontWeight: 400,
    },
  },
};
