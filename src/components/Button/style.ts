import { SxProps, Theme } from '@mui/material';
import { theme } from '@theme';

interface StyleProps {
  button: SxProps<Theme>;
  text: SxProps<Theme>;
}

export const style: StyleProps = {
  button: {
    height: '60px',
    borderRadius: '12px',
    border: `2px solid ${theme.palette.customPrimary[400]}`,
    backgroundColor: theme.palette.customPrimary[400],
    minWidth: '121px',
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: theme.palette.customPrimary[500],
      borderColor: theme.palette.customPrimary[500],
    },
    '&:active': {
      borderColor: theme.palette.customPrimary[500],
      backgroundColor: theme.palette.customPrimary[400],
    },
    '&:disabled': {
      backgroundColor: theme.palette.customPrimary[600],
      borderColor: theme.palette.customPrimary[600],
    },
  },

  text: { textTransform: 'capitalize' },
};
