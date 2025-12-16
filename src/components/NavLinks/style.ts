import { SxProps, Theme } from '@mui/material';
import { theme } from '@theme';

interface StyleProps {
  link: SxProps<Theme>;
}

export const style: StyleProps = {
  link: {
    color: theme.palette.customGray[200],
    px: '16px',
    py: '12px',
  },
};
