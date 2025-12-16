import { SxProps, Theme } from '@mui/material';
import { theme } from '@theme';

interface StyleProps {
  ratingContainer: SxProps<Theme>;
  rating: SxProps<Theme>;
  starImage: SxProps<Theme>;
}

export const style: StyleProps = {
  ratingContainer: {
    height: '40px',
    backgroundColor: theme.palette.customBlack[65],
    px: '8px',
    py: '4px',
    borderRadius: '8px',
    display: 'inline-flex',
    gap: '4px',
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  },

  rating: { color: theme.palette.customWarning[500] },

  starImage: { height: '16px' },
};
