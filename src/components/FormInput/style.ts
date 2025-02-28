import { SxProps, Theme } from '@mui/material';

interface StyleProps {
  endIcon: SxProps<Theme>;
}

export const style: StyleProps = {
  endIcon: {
    cursor: 'pointer',
  },
};
