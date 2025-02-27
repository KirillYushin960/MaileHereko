import { SxProps, Theme } from '@mui/material';
import { theme } from '@theme';

interface StyleProps {
  appBar: SxProps<Theme>;
  toolbar: SxProps<Theme>;
  logoButton: SxProps<Theme>;
  menuButton: SxProps<Theme>;
  linkContainer: SxProps<Theme>;
}

export const style: StyleProps = {
  appBar: {
    height: '80px',
    backgroundColor: theme.palette.customGray[900],
  },

  toolbar: {
    width: '100%',
    maxWidth: '1240px',
    px: '20px',
    mx: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
    height: '80px',
  },

  logoButton: { p: '12px' },

  linkContainer: { display: 'flex', gap: '16px' },

  menuButton: {
    color: theme.palette.customGray[200],
  },
};
