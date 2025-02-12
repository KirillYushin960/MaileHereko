import { alpha, SxProps, Theme } from '@mui/material';
import { theme } from '@theme';

interface StyleProps {
  subtitle: SxProps<Theme>;
  title: SxProps<Theme>;
  card: SxProps<Theme>;
  cardTitle: SxProps<Theme>;
  ratingContainer: SxProps<Theme>;
  rating: SxProps<Theme>;
  cardMedia: SxProps<Theme>;
  cardContent: SxProps<Theme>;
  backgroundOverlay: (image?: string | null | undefined, placeholder?: string) => SxProps<Theme>;
}

export const style: StyleProps = {
  subtitle: { color: theme.palette.customPrimary[200] },

  title: { color: theme.palette.customGray[50], mb: '24px' },

  ratingContainer: {
    height: '40px',
    backgroundColor: theme.palette.customBlack[65],
    px: '8px',
    py: '4px',
    borderRadius: '8px',
    display: 'flex',
    gap: '4px',
    position: 'absolute',
    left: 16,
    top: 18,
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  },

  rating: { color: theme.palette.customWarning[500] },

  card: {
    width: '282px',
    backgroundColor: theme.palette.customGray[800],
    borderRadius: '12px',
    backdropFilter: 'blur(80px)',
    height: '480px',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: 'none',
  },

  backgroundOverlay: (image, placeholder) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: `linear-gradient(${alpha(theme.palette.customGray[800] || '#20283ECC', 0.8)}, ${alpha(
      theme.palette.customGray[800] || '#20283ECC',
      0.8
    )}), url(${image || placeholder})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'blur(80px)',
    zIndex: -2,
  }),

  cardMedia: { m: '8px 8px 0px 8px', height: '400px', width: '266px', borderRadius: '8px' },

  cardContent: { height: '72px', display: 'flex', alignItems: 'center' },

  cardTitle: {
    color: theme.palette.customGray[50],
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    WebkitLineClamp: 2,
    textOverflow: 'ellipsis',
  },
};
