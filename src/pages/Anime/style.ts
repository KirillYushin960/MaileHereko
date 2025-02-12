import { SxProps, Theme } from '@mui/material';
import { theme } from '@theme';

interface StyleProps {
  subtitle: SxProps<Theme>;
  title: SxProps<Theme>;
  searchContainer: SxProps<Theme>;
  card: SxProps<Theme>;
  cardTitle: SxProps<Theme>;
  counter: SxProps<Theme>;
  input: SxProps<Theme>;
  noResults: SxProps<Theme>;
}

export const style: StyleProps = {
  subtitle: { color: theme.palette.customPrimary[200] },

  title: { color: theme.palette.customGray[50], mb: '24px' },

  searchContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: { xs: 'center', sm: 'flex-start' },
    gap: { xs: '16px', sx: '8px' },
    mb: '48px',
  },

  input: { mb: '48px' },

  counter: { color: theme.palette.customGray[400], mb: '24px' },

  card: {
    width: '282px',
    borderRadius: '12px',
    backdropFilter: 'blur(80px)',
    height: '480px',
  },

  cardTitle: {
    color: theme.palette.customGray[50],
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    WebkitLineClamp: 2,
    textOverflow: 'ellipsis',
  },

  noResults: { color: theme.palette.customGray[50], textAlign: 'center' },
};
