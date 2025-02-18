import { SxProps, Theme } from '@mui/material';
import { theme } from '@theme';

interface StyleProps {
  container: SxProps<Theme>;
  title: SxProps<Theme>;
  description: SxProps<Theme>;
}

export const style: StyleProps = {
  container: { display: 'flex', flexDirection: 'column', gap: '8px', mb: 0 },

  title: { color: theme.palette.customGray[400] },

  description: { color: theme.palette.customGray[100], textTransform: 'capitalize' },
};
