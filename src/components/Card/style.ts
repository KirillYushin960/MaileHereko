import { alpha, SxProps, Theme } from '@mui/material';
import { theme } from '@theme';

interface StyleProps {
  card: SxProps<Theme>;
  title: SxProps<Theme>;
  media: SxProps<Theme>;
  content: SxProps<Theme>;
  container: SxProps<Theme>;
  rating: SxProps<Theme>;
  backgroundOverlay: (image?: string | null, placeholder?: string) => SxProps<Theme>;
}

export const style: StyleProps = {
  container: { textDecoration: 'none' },

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

  media: { m: '8px 8px 0px 8px', height: '400px', width: '266px', borderRadius: '8px' },

  content: { height: '72px', display: 'flex', alignItems: 'center' },

  title: {
    color: theme.palette.customGray[50],
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    WebkitLineClamp: 2,
    textOverflow: 'ellipsis',
  },

  rating: { position: 'absolute', left: 16, top: 18 },
};
