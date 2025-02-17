import { SxProps, Theme } from '@mui/material';
import { theme } from '@theme';

interface StyleProps {
  utilityText: SxProps<Theme>;
}

export const style: StyleProps = {
  utilityText: { color: theme.palette.customGray[50], textAlign: 'center' },
};
