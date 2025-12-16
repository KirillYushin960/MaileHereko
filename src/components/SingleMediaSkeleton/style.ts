import { SxProps, Theme } from '@mui/material';
import { theme } from '@theme';

interface StyleProps {
  banner: SxProps<Theme>;
  image: SxProps<Theme>;
  title: SxProps<Theme>;
  description: SxProps<Theme>;
  infoTitle: SxProps<Theme>;
  info: SxProps<Theme>;
  container: SxProps<Theme>;
  infoContainer: SxProps<Theme>;
}

export const style: StyleProps = {
  banner: {
    width: '100%',
    height: { xs: '100px', sm: '200px', md: '300px' },
    borderRadius: { xs: '8px', sm: '24px', lg: '40px' },
    backgroundColor: theme.palette.customGray[800],
    maxWidth: '1200px',
    mt: '40px',
    transform: 'none',
  },

  container: {
    mt: { xs: '102px', sm: '152px' },
    width: '100%',
    maxWidth: '1040px',
    mx: 'auto',
    display: 'flex',
    justifyContent: { xs: 'center', sm: 'flex-start' },
    gap: { xs: '40px', lg: '80px' },
    flexDirection: { xs: 'column', sm: 'row' },
  },

  infoContainer: { display: 'flex', flexDirection: 'column', width: '100%', gap: '40px' },

  image: {
    width: '100%',
    height: '660px',
    transform: 'none',
    backgroundColor: theme.palette.customGray[800],
    borderRadius: { xs: '8px', sm: '12px', md: '18px', lg: '24px' },
  },

  title: {
    height: '24px',
    width: '80%',
    transform: 'none',
    backgroundColor: theme.palette.customGray[800],
    borderRadius: { xs: '8px', sm: '12px', md: '18px', lg: '24px' },
  },

  description: {
    height: '280px',
    width: '100%',
    transform: 'none',
    backgroundColor: theme.palette.customGray[800],
    borderRadius: { xs: '8px', sm: '12px', md: '18px', lg: '24px' },
  },

  infoTitle: {
    height: '24px',
    width: '80px',
    transform: 'none',
    backgroundColor: theme.palette.customGray[800],
    borderRadius: { xs: '8px', sm: '12px', md: '18px', lg: '24px' },
  },

  info: {
    height: '48px',
    width: '80%',
    transform: 'none',
    backgroundColor: theme.palette.customGray[800],
    borderRadius: { xs: '8px', sm: '12px', md: '18px', lg: '24px' },
  },
};
