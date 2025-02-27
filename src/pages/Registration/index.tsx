/* eslint-disable no-console */
import { Box, IconButton, Typography } from '@mui/material';
import { style } from './style';
import { Button } from '@components/Button';
import { projectName } from '@constants';
import IconGoogle from '@assets/icons/google.svg';
import { userStore } from '@store/UserStore';
import { observer } from 'mobx-react-lite';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState, useEffect, KeyboardEvent } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import RevealedPassword from '@assets/icons/eye.svg';
import HiddenPassword from '@assets/icons/eye-slash.svg';
import { RegisterForm } from '@types';
import { registerSchema } from '@schemas';
import { useNavigate } from 'react-router-dom';
import { FormInput } from '@components/FormInput';

const Registration = () => {
  const navigate = useNavigate();

  const {
    registerWithEmail,
    loginWithGoogle,
    authError,
    clearAuthError,
    lastVisitedPage,
    clearLastVisitedPage,
  } = userStore;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
    reValidateMode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      confirmPassword: '',
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (authError) {
      setError('root', { message: authError.message });
      clearAuthError();
    }
  }, [authError, setError, clearAuthError]);

  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    try {
      await registerWithEmail(data.email, data.password, data.firstName, data.lastName);
      navigate(lastVisitedPage || '/');
      clearLastVisitedPage();
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate(lastVisitedPage || '/');
      clearLastVisitedPage();
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <Box sx={style.container} onKeyDown={handleKeyDown}>
      <Typography variant="h4" sx={style.header}>
        Sign up to {projectName}
      </Typography>

      <Box sx={style.inputContainer}>
        {/* map */}
        <FormInput
          control={control}
          label="First name"
          name="firstName"
          error={errors.firstName}
          helperText={errors.firstName?.message}
          clearErrors={clearErrors}
        />

        <FormInput
          control={control}
          label="Last name"
          name="lastName"
          error={errors.lastName}
          helperText={errors.lastName?.message}
          clearErrors={clearErrors}
        />

        <FormInput
          control={control}
          label="Email"
          name="email"
          error={errors.email}
          helperText={errors.email?.message}
          clearErrors={clearErrors}
        />

        <FormInput
          control={control}
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          error={errors.password}
          clearErrors={clearErrors}
          helperText={errors.password?.message}
          endIcon={showPassword ? HiddenPassword : RevealedPassword}
          onEndIconClick={() => setShowPassword((prev) => !prev)}
        />

        <FormInput
          control={control}
          name="confirmPassword"
          label="Confirm password"
          type={showConfirmPassword ? 'text' : 'password'}
          error={errors.confirmPassword}
          clearErrors={clearErrors}
          helperText={errors.confirmPassword?.message}
          endIcon={showConfirmPassword ? HiddenPassword : RevealedPassword}
          onEndIconClick={() => setShowConfirmPassword((prev) => !prev)}
        />

        {errors.root && (
          <Typography variant="body2" color="error" sx={style.rootError}>
            {errors.root.message}
          </Typography>
        )}
      </Box>

      <Button onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>
        Sign up
      </Button>

      <Box sx={style.authModeContainer}>
        <Box sx={style.authModeSwitch}>
          <Typography variant="bodyRegular" sx={style.text}>
            Already have an account?
          </Typography>
          <Typography
            variant="bodyRegular"
            sx={style.interactionText}
            onClick={() => navigate('/login')}
          >
            Sign in
          </Typography>
        </Box>

        <IconButton sx={style.logoButton} onClick={handleGoogleLogin} disabled={isSubmitting}>
          <Box component="img" src={IconGoogle} alt="Google login" draggable="false" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default observer(Registration);
