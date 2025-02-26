import { SxProps, Theme } from '@mui/material';
import { theme } from '@theme';

interface StyleProps {
  container: SxProps<Theme>;
  header: SxProps<Theme>;
  logoButton: SxProps<Theme>;
  text: SxProps<Theme>;
  interactionText: SxProps<Theme>;
  rootError: SxProps<Theme>;
  inputEndIcon: SxProps<Theme>;
  authModeSwitch: SxProps<Theme>;
  authModeContainer: SxProps<Theme>;
  inputContainer: SxProps<Theme>;
}

export const style: StyleProps = {
  container: {
    maxWidth: '560px',
    border: `1px solid ${theme.palette.customGray[800]}`,
    backgroundColor: theme.palette.customGray[900],
    display: 'flex',
    mx: 'auto',
    my: '48px',
    px: { xs: '20px', sm: '80px' },
    py: { xs: '40px', sm: '80px' },
    gap: { xs: '60px', sm: '40px' },
    flexDirection: 'column',
    borderRadius: '24px',
  },

  header: { color: theme.palette.customGray[100], width: '100%', textAlign: 'center' },

  inputContainer: { display: 'flex', flexDirection: 'column', gap: '40px', position: 'relative' },

  logoButton: {
    height: '48px',
    width: '48px',
    p: 0,
    backgroundColor: theme.palette.customWhite[100],
    '&:hover': { backgroundColor: theme.palette.customGray[50] },
  },

  text: { color: theme.palette.customGray[100] },

  interactionText: {
    color: theme.palette.customWhite[100],
    alignSelf: 'flex-start',
    '&:hover': { color: theme.palette.customGray[50] },
    cursor: 'pointer',
  },

  rootError: { position: 'absolute', bottom: { xs: '-40px', sm: '-30px' } },

  inputEndIcon: {
    cursor: 'pointer',
  },

  authModeContainer: { display: 'flex', justifyContent: 'space-between' },

  authModeSwitch: { display: 'flex', flexDirection: 'column' },
};
