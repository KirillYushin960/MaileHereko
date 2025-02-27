import { SxProps, Theme } from '@mui/material';
import { theme } from '@theme';

interface StyleProps {
  drawer: SxProps<Theme>;
  container: SxProps<Theme>;
}

export const style: StyleProps = {
  drawer: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.palette.customGray[900],
    width: '240px',
    textAlign: 'center',
    height: '100%',
  },

  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
  },
};
