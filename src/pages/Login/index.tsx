import { Box, IconButton, Typography } from '@mui/material';
import { style } from './style';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { emailRegex, projectName } from '@constants';
import IconGoogle from '@assets/icons/google.svg';
import { userStore } from '@store/UserStore';
import { observer } from 'mobx-react-lite';
import { Controller, ControllerRenderProps, SubmitHandler, useForm } from 'react-hook-form';
import { ChangeEvent, useState, useEffect } from 'react';
import RevealedPassword from '@assets/icons/eye.svg';
import HiddenPassword from '@assets/icons/eye-slash.svg';

interface LoginForm {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

// использовать zod
const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
    reset,
    watch,
    // register,
  } = useForm<LoginForm>({
    mode: 'onBlur',
    reValidateMode: 'onSubmit',
    //zod reducer
    defaultValues: { email: '', password: '', confirmPassword: '', firstName: '', lastName: '' },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { registerWithEmail, loginWithEmail, loginWithGoogle, lastAuthError, clearAuthError } =
    userStore;

  useEffect(() => {
    if (lastAuthError) {
      setError('root', { message: lastAuthError.message });
      clearAuthError();
    }
  }, [lastAuthError, setError, clearAuthError]);

  const onSubmit: SubmitHandler<LoginForm> = async ({ email, password, firstName, lastName }) => {
    if (userStore.isRegistering) {
      await registerWithEmail(email, password, firstName, lastName);
    }

    if (!userStore.isRegistering) {
      await loginWithEmail(email, password);
    }
  };

  const toggleAuthMode = () => {
    userStore.toggleRegistrationMode();
    reset();
    clearErrors('root');
  };

  const handleFieldChange =
    (field: ControllerRenderProps<LoginForm>) => (e: ChangeEvent<HTMLInputElement>) => {
      field.onChange(e);
      clearErrors(field.name);
      clearErrors('root');
    };

  const password = watch('password');

  return (
    <Box sx={style.container}>
      <Typography variant="h4" sx={style.header}>
        {userStore.isRegistering ? `Sign up to ${projectName}` : `Sign in to ${projectName}`}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        {userStore.isRegistering && (
          <Controller
            name="firstName"
            control={control}
            rules={{ required: 'First name is required' }}
            render={({ field }) => (
              <Input
                {...field}
                label="First Name"
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                onChange={handleFieldChange(field)}
              />
            )}
          />
        )}

        {userStore.isRegistering && (
          <Controller
            name="lastName"
            control={control}
            rules={{ required: 'Last name is required' }}
            render={({ field }) => (
              <Input
                {...field}
                label="Last Name"
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                onChange={handleFieldChange(field)}
              />
            )}
          />
        )}

        <Controller
          name="email"
          control={control}
          rules={{
            required: 'Email is required',
            pattern: { value: emailRegex, message: 'Invalid email format' },
          }}
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
          rules={{
            required: 'Password is required',
            minLength: { value: 6, message: 'Password must be at least 6 characters' },
          }}
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

        {userStore.isRegistering && (
          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: 'Confirm password is required',
              validate: (value) => value === password || 'Passwords do not match',
            }}
            render={({ field }) => (
              <Input
                {...field}
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
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
        {userStore.isRegistering ? 'Sign up' : 'Sign in'}
      </Button>

      <Box sx={style.authModeContainer}>
        <Box sx={style.authModeSwitch}>
          <Typography variant="bodyRegular" sx={style.text}>
            {userStore.isRegistering ? 'Already have an account?' : `New to ${projectName}?`}
          </Typography>
          <Typography variant="bodyRegular" sx={style.interactionText} onClick={toggleAuthMode}>
            {userStore.isRegistering ? 'Sign in' : 'Create an account'}
          </Typography>
        </Box>

        <IconButton sx={style.logoButton} onClick={loginWithGoogle} disabled={isSubmitting}>
          <Box component="img" src={IconGoogle} alt="Google login" draggable="false" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default observer(Login);
