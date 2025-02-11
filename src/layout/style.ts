import { theme } from '@theme';
import { SxProps, Theme } from '@mui/material';
import backgroundImage from '@assets/background.png';

interface StyleProps {
  container: SxProps<Theme>;
  backgroundImageContainer: SxProps<Theme>;
  content: SxProps<Theme>;
}

export const style: StyleProps = {
  container: {
    display: 'flex',
    backgroundColor: theme.palette.customGray[900],
    flex: '1',
    justifyContent: 'center',
  },

  backgroundImageContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '1440px',
    background: `
      linear-gradient(
      to right,
      ${theme.palette.customGray[900]} 0%,
      ${theme.palette.customGray[900]} 1%,
      transparent 10%,
      transparent 90%,
      ${theme.palette.customGray[900]} 99%,
      ${theme.palette.customGray[900]} 100%
      ),
      url(${backgroundImage})`,
    backgroundSize: 'auto',
    backgroundRepeat: 'repeat-y',
    backgroundPosition: 'center top -144px',
  },

  content: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '1240px',
    width: '100%',
    pt: '144px',
    px: '20px',
  },
};
