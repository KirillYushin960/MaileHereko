import { SxProps, Theme } from '@mui/material';
import { theme } from '@theme';

interface StyleProps {
  avatar: SxProps<Theme>;
  container: SxProps<Theme>;
  item: SxProps<Theme>;
  mobileContainer: SxProps<Theme>;
  mobileInfoContainer: SxProps<Theme>;
  mobileItem: SxProps<Theme>;
}

export const style: StyleProps = {
  container: { display: 'flex', flexDirection: 'column' },

  item: { px: '16px', py: '6px', color: theme.palette.customGray[50] },

  mobileContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: '8px',
    alignSelf: 'flex-start',
    m: '16px 0px 16px 16px',
  },

  avatar: { width: 32, height: 32, alignSelf: 'center' },

  mobileInfoContainer: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start' },

  mobileItem: {
    color: theme.palette.customGray[50],
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '180px',
  },
};
