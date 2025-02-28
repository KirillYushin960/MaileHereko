import { SxProps, Theme } from '@mui/material';
import { theme } from '@theme';

interface StyleProps {
  authModeSwitch: SxProps<Theme>;
  authModeContainer: SxProps<Theme>;
  text: SxProps<Theme>;
  logoButton: SxProps<Theme>;
  interactionText: SxProps<Theme>;
}

export const style: StyleProps = {
  logoButton: {
    height: '48px',
    width: '48px',
    p: 0,
    backgroundColor: theme.palette.customWhite[100],
    '&:hover': { backgroundColor: theme.palette.customGray[50] },
    '&:disabled': { backgroundColor: theme.palette.customGray[100] },
  },

  text: { color: theme.palette.customGray[100] },

  interactionText: {
    color: theme.palette.customWhite[100],
    alignSelf: 'flex-start',
    '&:hover': { color: theme.palette.customGray[50] },
    cursor: 'pointer',
  },

  authModeContainer: { display: 'flex', justifyContent: 'space-between' },

  authModeSwitch: { display: 'flex', flexDirection: 'column' },
};
