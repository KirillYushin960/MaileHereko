import { SxProps, Theme } from '@mui/material';
import { theme } from '@theme';

interface StyleProps {
  avatar: SxProps<Theme>;
  tooltip: SxProps<Theme>;
  menu: SxProps<Theme>;
  menuItem: SxProps<Theme>;
  menuDivider: SxProps<Theme>;
}

export const style: StyleProps = {
  avatar: { width: 32, height: 32, alignSelf: 'center' },

  menu: {
    backgroundColor: theme.palette.customGray[900],
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    minWidth: '300px',
    mt: 1.5,
    '& .MuiAvatar-root': {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    '&::before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      border: `1px solid ${theme.palette.customGray[700]}`,
      backgroundColor: theme.palette.customPrimary[900],
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: -2,
    },
  },

  tooltip: {
    '& .MuiTooltip-tooltip': {
      backgroundColor: theme.palette.customGray[900],
    },
  },

  menuItem: { px: '16px', py: '6px', color: theme.palette.customGray[50] },

  menuDivider: { backgroundColor: theme.palette.customGray[700] },
};
