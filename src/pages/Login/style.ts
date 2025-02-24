import { SxProps, Theme } from '@mui/material';
import { theme } from '@theme';

interface StyleProps {
  container: SxProps<Theme>;
  header: SxProps<Theme>;
  logoButton: SxProps<Theme>;
  text: SxProps<Theme>;
  interactionText: SxProps<Theme>;
  pointerBox: SxProps<Theme>;
}

export const style: StyleProps = {
  container: {
    maxWidth: '560px',
    border: `1px solid ${theme.palette.customGray[800]}`,
    backgroundColor: theme.palette.customGray[900],
    display: 'flex',
    m: 'auto',
    p: { xs: '20px', sm: '80px' },
    gap: '40px',
    flexDirection: 'column',
    borderRadius: '24px',
  },

  header: { color: theme.palette.customGray[100], width: '100%', textAlign: 'center' },

  logoButton: {
    height: '48px',
    width: '48px',
    p: 0,
    backgroundColor: theme.palette.customWhite[100],
    '&:hover': { backgroundColor: theme.palette.customGray[50] },
  },

  text: { color: theme.palette.customGray[100] },

  interactionText: {
    color: theme.palette.customWhite[100],
    '&:hover': { color: theme.palette.customGray[50] },
  },

  pointerBox: { cursor: 'pointer' },
};
