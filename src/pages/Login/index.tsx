/* eslint-disable no-console */
import { Box, IconButton, Typography } from '@mui/material';
import { style } from './style';
import { Input } from '@components/Input';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Button } from '@components/Button';
import { projectName } from '@constants';
import IconGoogle from '@assets/icons/google.svg';
import { userStore } from '@store/UserStore';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { FirebaseError } from 'firebase/app';

interface ErrorsState {
  login?: string;
  password?: string;
  general?: string;
}

const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const Login = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [errors, setErrors] = useState<ErrorsState>({});
  const [isLoading, setIsLoading] = useState(false);

  const { registerWithEmail, loginWithEmail, loginWithGoogle, user } = userStore;

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const validate = useCallback(() => {
    const newErrors: ErrorsState = {};

    if (!login.trim()) {
      newErrors.login = 'Email is required';
    } else if (!EMAIL_REGEX.test(login)) {
      newErrors.login = 'Invalid email format';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [login, password]);

  const handleIsRegistering = useCallback(() => {
    setIsRegistering((prev) => !prev);
    setLogin('');
    setPassword('');
    setErrors({});
  }, []);

  const handleLoginChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
    setErrors((prev) => ({ ...prev, login: undefined, general: undefined }));
  }, []);

  const handlePasswordChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setErrors((prev) => ({ ...prev, password: undefined, general: undefined }));
  }, []);

  const handleAuthError = useCallback((error: FirebaseError) => {
    let errorMessage = 'An unexpected error occurred';

    switch (error.code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        errorMessage = 'Incorrect email or password';
        break;
      case 'auth/email-already-in-use':
        errorMessage = 'Email already in use';
        break;
      case 'auth/weak-password':
        errorMessage = 'Password should be at least 6 characters';
        break;
      case 'auth/too-many-requests':
        errorMessage = 'Too many attempts, try again later';
        break;
      default:
        console.error('Auth error:', error);
    }

    setErrors((prev) => ({ ...prev, general: errorMessage }));
  }, []);

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsLoading(true);

    try {
      // попробовать без else
      if (isRegistering) {
        await registerWithEmail(login, password);
      } else {
        await loginWithEmail(login, password);
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        handleAuthError(error);
      } else {
        setErrors((prev) => ({ ...prev, general: 'An unexpected error occurred' }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);

    try {
      await loginWithGoogle();
    } catch (error) {
      setErrors((prev) => ({ ...prev, general: 'Google login failed' }));
      console.error('Google login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={style.container}>
      <Typography variant="h4" sx={style.header}>
        {isRegistering ? `Sign up to ${projectName}` : `Sign in to ${projectName}`}
      </Typography>

      {/* вынести в стили*/}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Box>
          <Input
            label="Email"
            value={login}
            onChange={handleLoginChange}
            error={!!errors.login}
            helperText={errors.login}
          />
        </Box>

        <Box>
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            error={!!errors.password}
            helperText={errors.password}
          />
        </Box>
      </Box>

      {errors.general && (
        <Typography variant="body2" color="error" sx={{ textAlign: 'center' }}>
          {errors.general}
        </Typography>
      )}

      <Button onClick={handleSubmit} disabled={isLoading}>
        {isRegistering ? 'Sign up' : 'Sign in'}
      </Button>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="bodyRegular" sx={style.text}>
            {isRegistering ? 'Already have an account?' : `New to ${projectName}?`}
          </Typography>

          <Box component="span" onClick={handleIsRegistering} sx={style.pointerBox}>
            <Typography variant="bodyRegular" sx={style.interactionText}>
              {isRegistering ? 'Sign in' : `Create an account`}
            </Typography>
          </Box>
        </Box>

        <IconButton sx={style.logoButton} onClick={handleGoogleLogin} disabled={isLoading}>
          <Box component="img" src={IconGoogle} alt="Google login" draggable="false" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default observer(Login);
