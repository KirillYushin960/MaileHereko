import { Box, IconButton, Typography } from '@mui/material';
import { style } from './style';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { projectName } from '@constants';
import IconGoogle from '@assets/icons/google.svg';
import { userStore } from '@store/UserStore';
import { observer } from 'mobx-react-lite';
import {
  Controller,
  ControllerRenderProps,
  FieldErrors,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { ChangeEvent, useState, useEffect, KeyboardEvent } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import RevealedPassword from '@assets/icons/eye.svg';
import HiddenPassword from '@assets/icons/eye-slash.svg';
import { LoginForm, RegisterForm } from '@types';
import { loginSchema, registerSchema } from '@schemas';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const {
    user,
    registerWithEmail,
    loginWithEmail,
    loginWithGoogle,
    authError,
    clearAuthError,
    isRegistering,
    lastVisitedPage,
    clearLastVisitedPage,
  } = userStore;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
    reset,
  } = useForm<RegisterForm | LoginForm>({
    resolver: zodResolver(isRegistering ? registerSchema : loginSchema),
    mode: 'onBlur',
    reValidateMode: 'onSubmit',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (authError) {
      setError('root', { message: authError.message });
      clearAuthError();
    }
  }, [authError, setError, clearAuthError]);

  const onSubmit: SubmitHandler<RegisterForm | LoginForm> = async (data) => {
    if (isRegistering) {
      const { email, password, firstName, lastName } = data as RegisterForm;
      await registerWithEmail(email, password, firstName, lastName);
    } else {
      const { email, password } = data as LoginForm;
      await loginWithEmail(email, password);
    }
  };

  const handleGoogleLogin = async () => {
    await loginWithGoogle();
  };

  // const handleRedirect = () => {
  //   if (!authError) {
  //     navigate(lastVisitedPage || '/');
  //     clearLastVisitedPage();
  //   }
  // };

  const toggleAuthMode = () => {
    userStore.toggleRegistrationMode();
    reset();
    clearErrors('root');
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleFieldChange =
    (field: ControllerRenderProps<RegisterForm | LoginForm>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      field.onChange(e);
      clearErrors(field.name);
      clearErrors('root');
    };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <Box sx={style.container} onKeyDown={handleKeyDown}>
      <Typography variant="h4" sx={style.header}>
        {isRegistering ? `Sign up to ${projectName}` : `Sign in to ${projectName}`}
      </Typography>

      <Box sx={style.inputContainer}>
        {isRegistering && (
          <>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="First Name"
                  error={!!(errors as FieldErrors<RegisterForm>).firstName}
                  helperText={(errors as FieldErrors<RegisterForm>).firstName?.message}
                  onChange={handleFieldChange(field)}
                />
              )}
            />
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Last Name"
                  error={!!(errors as FieldErrors<RegisterForm>).lastName}
                  helperText={(errors as FieldErrors<RegisterForm>).lastName?.message}
                  onChange={handleFieldChange(field)}
                />
              )}
            />
          </>
        )}

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Email"
              error={!!errors.email}
              helperText={errors.email?.message}
              onChange={handleFieldChange(field)}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Password"
              type={showPassword ? 'text' : 'password'}
              error={!!errors.password}
              helperText={errors.password?.message}
              onChange={handleFieldChange(field)}
              endIcon={showPassword ? HiddenPassword : RevealedPassword}
              endIconClick={() => setShowPassword(!showPassword)}
              endIconStyle={style.inputEndIcon}
            />
          )}
        />

        {isRegistering && (
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                error={!!(errors as FieldErrors<RegisterForm>).confirmPassword}
                helperText={(errors as FieldErrors<RegisterForm>).confirmPassword?.message}
                onChange={handleFieldChange(field)}
                endIcon={showConfirmPassword ? HiddenPassword : RevealedPassword}
                endIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
                endIconStyle={style.inputEndIcon}
              />
            )}
          />
        )}

        {errors.root && (
          <Typography variant="body2" color="error" sx={style.rootError}>
            {errors.root.message}
          </Typography>
        )}
      </Box>

      <Button onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>
        {isRegistering ? 'Sign up' : 'Sign in'}
      </Button>

      <Box sx={style.authModeContainer}>
        <Box sx={style.authModeSwitch}>
          <Typography variant="bodyRegular" sx={style.text}>
            {isRegistering ? 'Already have an account?' : `New to ${projectName}?`}
          </Typography>
          <Typography variant="bodyRegular" sx={style.interactionText} onClick={toggleAuthMode}>
            {isRegistering ? 'Sign in' : 'Create an account'}
          </Typography>
        </Box>

        <IconButton sx={style.logoButton} onClick={handleGoogleLogin} disabled={isSubmitting}>
          <Box component="img" src={IconGoogle} alt="Google login" draggable="false" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default observer(Login);
