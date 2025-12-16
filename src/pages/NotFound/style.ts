import { SxProps, Theme } from '@mui/material';
import { theme } from '@theme';

interface StyleProps {
  container: SxProps<Theme>;
  image: SxProps<Theme>;
  title: SxProps<Theme>;
  description: SxProps<Theme>;
  button: SxProps<Theme>;
}

export const style: StyleProps = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  image: {
    width: '100%',
    height: 'auto',
    maxWidth: '400px',
    maxHeight: '320px',
    my: '40px',
  },

  title: {
    color: theme.palette.customGray[50],
    mb: '16px',
    typography: { xs: 'h3', sm: 'h2', textAlign: 'center' },
  },

  description: {
    color: theme.palette.customGray[300],
    mb: '24px',
    textAlign: 'center',
    typography: 'bodyRegular',
  },

  button: { width: '139px' },
};
