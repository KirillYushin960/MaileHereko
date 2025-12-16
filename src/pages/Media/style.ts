import { SxProps, Theme } from '@mui/material';
import { theme } from '@theme';

interface StyleProps {
  subtitle: SxProps<Theme>;
  title: SxProps<Theme>;
  counter: SxProps<Theme>;
  input: SxProps<Theme>;
}

export const style: StyleProps = {
  subtitle: {
    color: theme.palette.customPrimary[200],
    mt: '64px',
    textDecoration: 'none',
    textTransform: 'capitalize',
    alignSelf: 'flex-start',
  },

  title: { color: theme.palette.customGray[50], mb: '24px' },

  input: { mb: '48px' },

  counter: { color: theme.palette.customGray[400], mb: '24px' },
};
