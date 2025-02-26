import { SxProps, Theme } from '@mui/material';

interface StyleProps {
  load: SxProps<Theme>;
}

export const style: StyleProps = {
  load: { display: 'flex', justifyContent: 'center', mt: 4 },
};
