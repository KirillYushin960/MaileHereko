import { SxProps, Theme } from '@mui/material';
import { theme } from '@theme';

interface StyleProps {
  inputBox: SxProps<Theme>;
  input: SxProps<Theme>;
}

export const style: StyleProps = {
  inputBox: {
    border: `1px solid ${theme.palette.customGray[700]}`,
    width: { xs: 'auto', sm: '344px' },
    maxWidth: '384px',
    height: '64px',
    borderRadius: '12px',
    backgroundColor: theme.palette.customBlack[10],
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    px: '16px',
    transition: 'border-color 0.3s',
    '&:hover': {
      borderColor: theme.palette.customGray[500],
    },
    '&:focus-within': {
      borderColor: theme.palette.customGray[300],
    },
  },

  input: {
    marginLeft: '-16px',
    backgroundColor: 'transparent',
    '&& .MuiFilledInput-root': {
      color: theme.palette.customGray[400],
      fontFamily: 'Poppins',
      fontSize: '16px',
      fontWeight: 400,
      backgroundColor: 'transparent',
      '&:before, &:after': {
        borderBottom: 'none',
      },
      '&:hover:before': {
        borderBottom: 'none',
      },
    },
    '&& .MuiInputBase-input': {
      borderBottom: 'none',
    },
    '&& .MuiInputLabel-root': {
      color: theme.palette.customGray[600],
      fontFamily: 'Poppins',
      fontSize: '14px',
      fontWeight: 400,
      borderBottom: 'none',
    },
  },
};
