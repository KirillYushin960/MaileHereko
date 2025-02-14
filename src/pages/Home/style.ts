import { SxProps, Theme } from '@mui/material';
import { theme } from '@theme';

interface StyleProps {
  title: SxProps<Theme>;
  counter: SxProps<Theme>;
  input: SxProps<Theme>;
  buttonGroup: SxProps<Theme>;
  description: SxProps<Theme>;
  descriptionSpan: SxProps<Theme>;
}

export const style: StyleProps = {
  title: { color: theme.palette.customGray[50], mb: '16px' },

  description: { color: theme.palette.customGray[300], maxWidth: '588px', mb: '24px' },

  descriptionSpan: { color: theme.palette.customPrimary[300] },

  input: { mb: '80px' },

  buttonGroup: { mb: '24px' },

  counter: { color: theme.palette.customGray[400], mb: '24px' },
};
