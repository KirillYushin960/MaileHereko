import { SxProps, Theme } from '@mui/material';
import { theme } from '@theme';

interface StyleProps {
  container: SxProps<Theme>;
  rating: SxProps<Theme>;
  image: SxProps<Theme>;
  title: SxProps<Theme>;
}

export const style: StyleProps = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    width: '282px',
    height: '480px',
  },

  rating: {
    position: 'absolute',
    width: '60px',
    height: '32px',
    top: '16px',
    left: '16px',
    backgroundColor: theme.palette.customBlack[20],
    transform: 'none',
    zIndex: 2,
  },

  image: {
    height: '400px',
    width: '266px',
    backgroundColor: theme.palette.customGray[800],
    transform: 'none',
    borderRadius: '8px',
    m: '8px',
  },

  title: {
    height: '16px',
    width: '150px',
    backgroundColor: theme.palette.customGray[800],
    transform: 'none',
    borderRadius: '8px',
    m: '8px',
  },
};
