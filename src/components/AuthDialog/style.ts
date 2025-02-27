import { SxProps, Theme } from '@mui/material';
import { theme } from '@theme';

interface StyleProps {
  container: SxProps<Theme>;
  message: SxProps<Theme>;
  cancelText: SxProps<Theme>;
  signInButton: SxProps<Theme>;
  signInText: SxProps<Theme>;
  actionContainer: SxProps<Theme>;
}

export const style: StyleProps = {
  container: {
    '& 	.MuiDialog-paper': {
      backgroundColor: theme.palette.customGray[900],
      px: '16px',
      py: '8px',
      borderRadius: '24px',
    },
  },

  message: { color: theme.palette.customGray[50] },

  cancelText: { color: theme.palette.customGray[200] },

  actionContainer: { display: 'flex', justifyContent: 'space-evenly' },

  signInButton: {
    border: `1px solid ${theme.palette.customPrimary[400]}`,
    width: '160px',
    borderRadius: '24px',
    '&:hover': {
      backgroundColor: theme.palette.customPrimary[800],
    },
  },

  signInText: { color: theme.palette.customPrimary[400] },
};
