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
    '&:hover': {
      borderColor: theme.palette.customGray[500],
    },
    '&:focus-within': {
      borderColor: theme.palette.customGray[300],
    },
    '&.error': {
      borderColor: theme.palette.error.main,
    },
  },

  input: {
    marginLeft: '-16px',
    backgroundColor: 'transparent',
    width: '100%',
    '&& .MuiFilledInput-root': {
      color: theme.palette.customGray[400],
      fontFamily: 'Poppins',
      position: 'relative',
      fontSize: '16px',
      fontWeight: 400,
      backgroundColor: 'transparent',
      paddingBottom: '0px',
      '&:before, &:after': {
        borderBottom: 'none',
      },
      '&:hover:before': {
        borderBottom: 'none',
      },
    },
    '&& .MuiInputBase-input': {
      borderBottom: 'none',
      paddingBottom: '0px',
      p: 0,
      m: '25px 12px 0px',
    },
    '&& .MuiInputLabel-root': {
      color: theme.palette.customGray[600],
      fontFamily: 'Poppins',
      fontSize: '14px',
      fontWeight: 400,
      borderBottom: 'none',
    },
    '&& .MuiFormHelperText-root': {
      minHeight: '20px',
      position: 'absolute',
      top: '60px',
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      WebkitLineClamp: 2,
      textOverflow: 'ellipsis',
      m: '0',
    },
  },
};
