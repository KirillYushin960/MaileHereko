import { SxProps, Theme } from '@mui/material';
import { theme } from '@theme';

interface StyleProps {
  appBar: SxProps<Theme>;
  toolbar: SxProps<Theme>;
  linkContainer: SxProps<Theme>;
  link: SxProps<Theme>;
  avatar: SxProps<Theme>;
  menuButton: SxProps<Theme>;
  menu: SxProps<Theme>;
  logoButton: SxProps<Theme>;
  profileTooltip: SxProps<Theme>;
  profileMenu: SxProps<Theme>;
  profileMenuItem: SxProps<Theme>;
  profileMenuDivider: SxProps<Theme>;
  dialogContainer: SxProps<Theme>;
  dialogText: SxProps<Theme>;
  dialogLogoutText: SxProps<Theme>;
  dialogStayText: SxProps<Theme>;
  mobileLinksContainer: SxProps<Theme>;
}

export const style: StyleProps = {
  appBar: {
    height: '80px',
    backgroundColor: theme.palette.customGray[900],
  },

  toolbar: {
    width: '100%',
    maxWidth: '1240px',
    px: '20px',
    mx: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
    height: '80px',
  },

  logoButton: { p: '12px' },

  linkContainer: { display: 'flex', gap: '16px' },

  link: {
    color: theme.palette.customGray[200],
    px: '16px',
    py: '12px',
  },

  avatar: { width: 32, height: 32, alignSelf: 'center' },

  menuButton: {
    color: theme.palette.customGray[200],
  },

  menu: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.palette.customGray[900],
    width: '240px',
    textAlign: 'center',
    height: '100%',
  },

  profileMenu: {
    backgroundColor: theme.palette.customGray[900],
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
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

  profileTooltip: {
    '& .MuiTooltip-tooltip': {
      backgroundColor: theme.palette.customGray[900],
    },
  },

  profileMenuDivider: { backgroundColor: theme.palette.customGray[700] },

  profileMenuItem: { px: '16px', py: '6px', color: theme.palette.customGray[50] },

  dialogContainer: {
    '& 	.MuiDialog-paper': {
      backgroundColor: theme.palette.customGray[900],
      px: '16px',
      py: '8px',
      borderRadius: '24px',
    },
  },

  dialogText: { color: theme.palette.customGray[50] },

  dialogStayText: { color: theme.palette.customGray[200] },

  dialogLogoutText: { color: theme.palette.customError[500] },

  mobileLinksContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
  },
};
