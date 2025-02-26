import { alpha, SxProps, Theme } from '@mui/material';
import { theme } from '@theme';

interface StyleProps {
  banner: SxProps<Theme>;
  title: SxProps<Theme>;
  subtitle: SxProps<Theme>;
  separator: SxProps<Theme>;
  titleBox: (banner?: string | null) => SxProps<Theme>;
}

export const style: StyleProps = {
  banner: {
    width: '100%',
    height: { xs: '100px', sm: '200px', md: '300px' },
    maxWidth: '1200px',
    borderRadius: { xs: '8px', sm: '24px', lg: '40px' },
    objectFit: 'cover',
    objectPosition: 'center',
    mt: '40px',
    position: 'relative',
  },

  titleBox: (banner) => ({
    width: { xs: '240px', sm: '460px', md: '560px' },
    position: banner ? 'absolute' : 'static',
    mt: banner ? { xs: '118px', sm: '198px', md: '268px' } : '40px',
    mx: { xs: '20px', sm: '40px', md: '60px', lg: '80px' },
    backgroundColor: alpha(theme.palette.customGray[800] || '#20283ECC', 0.8),
    borderRadius: { xs: '8px', sm: '24px' },
    display: 'flex',
    flexDirection: 'column',
    p: { xs: '12px', sm: '24px', md: '40px' },
    gap: '8px',
    justifyContent: 'center',
  }),

  title: {
    color: theme.palette.customGray[50],
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    WebkitLineClamp: 2,
    textOverflow: 'ellipsis',
    fontFamily: 'Poppins',
    typography: {
      xs: 'h5',
      sm: 'h3',
    },
  },

  subtitle: {
    fontFamily: 'Poppins',
    color: theme.palette.customPrimary[200],
    textDecoration: 'none',
    textTransform: 'capitalize',
  },

  separator: {
    '& .MuiBreadcrumbs-separator': { color: '#8996A1' },
  },
};
