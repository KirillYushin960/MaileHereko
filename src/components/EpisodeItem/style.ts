import { SxProps, Theme } from '@mui/material';
import { theme } from '@theme';

interface StyleProps {
  image: SxProps<Theme>;
  text: SxProps<Theme>;
}

export const style: StyleProps = {
  image: { height: '160px', width: '100%', objectFit: 'cover', objectPosition: 'center' },

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
