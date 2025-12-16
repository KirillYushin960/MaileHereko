import { SxProps, Theme } from '@mui/material';
import { theme } from '@theme';

interface StyleProps {
  container: SxProps<Theme>;
  activeButton: SxProps<Theme>;
  inactiveButton: SxProps<Theme>;
}

export const style: StyleProps = {
  container: {
    width: { xs: '280px', sm: '368px' },
    height: '56px',
    backgroundColor: theme.palette.customBlack[20],
    p: '8px',
    display: 'flex',
    borderRadius: '12px',
  },

  activeButton: {
    maxHeight: '40px',
    px: '32px',
    py: '8px',
    borderRadius: '8px',
    flex: 1,
    minWidth: 'none',
  },

  inactiveButton: {
    maxHeight: '40px',
    px: '32px',
    py: '8px',
    borderRadius: '8px',
    flex: 1,
    minWidth: 'none',
    color: theme.palette.customGray[200],
  },
};
