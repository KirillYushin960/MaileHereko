import { SxProps, Theme } from '@mui/material';
import { theme } from '@theme';

interface StyleProps {
  dialogContainer: SxProps<Theme>;
  dialogText: SxProps<Theme>;
  dialogLogoutText: SxProps<Theme>;
  dialogStayText: SxProps<Theme>;
}

export const style: StyleProps = {
  dialogContainer: {
    '& 	.MuiDialog-paper': {
      backgroundColor: theme.palette.customGray[900],
      px: '16px',
      py: '8px',
      borderRadius: '24px',
    },
  },

  dialogText: { color: theme.palette.customGray[50] },

  dialogStayText: { color: theme.palette.customGray[200] },

  dialogLogoutText: { color: theme.palette.customError[500] },
};
