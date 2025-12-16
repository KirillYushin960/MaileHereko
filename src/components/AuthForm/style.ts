import { SxProps, Theme } from '@mui/material';
import { theme } from '@theme';

interface StyleProps {
  container: SxProps<Theme>;
  header: SxProps<Theme>;
  inputContainer: SxProps<Theme>;
  rootError: SxProps<Theme>;
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

  rootError: { position: 'absolute', bottom: { xs: '-40px', sm: '-30px' } },
};
