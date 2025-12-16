/* eslint-disable no-console */
import { Box, IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { style } from './style';
import IconGoogle from '@assets/icons/google.svg';
import { userStore } from '@store/UserStore';

interface IAuthActions {
  alternateActionText: string;
  alternateActionLink: string;
  isSubmitting: boolean;
}

export const AuthActions = ({
  alternateActionText,
  alternateActionLink,
  isSubmitting,
}: IAuthActions) => {
  const navigate = useNavigate();

  const { lastVisitedPage, loginWithGoogle, clearLastVisitedPage } = userStore;

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate(lastVisitedPage || '/');
      clearLastVisitedPage();
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  return (
    <Box sx={style.authModeContainer}>
      <Box sx={style.authModeSwitch}>
        <Typography variant="bodyRegular" sx={style.text}>
          {alternateActionText}
        </Typography>

        <Typography
          variant="bodyRegular"
          sx={style.interactionText}
          onClick={() => navigate(alternateActionLink)}
        >
          {alternateActionLink === '/login' ? 'Sign in' : 'Create an account'}
        </Typography>
      </Box>

      <IconButton sx={style.logoButton} onClick={handleGoogleLogin} disabled={isSubmitting}>
        <Box component="img" src={IconGoogle} alt="Google login" draggable="false" />
      </IconButton>
    </Box>
  );
};
