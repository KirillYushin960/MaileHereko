import { SxProps, Theme } from '@mui/material';
import { theme } from '@theme';

interface StyleProps {
  subtitle: SxProps<Theme>;
  title: SxProps<Theme>;
  searchContainer: SxProps<Theme>;
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
    gap: '8px',
  },
};
