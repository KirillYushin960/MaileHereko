/* eslint-disable no-console */
import { AuthForm } from '@components/AuthForm';
import { loginSchema } from '@schemas';
import { userStore } from '@store/UserStore';
import { FormField, LoginForm } from '@types';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const { loginWithEmail, lastVisitedPage, clearLastVisitedPage } = userStore;

  const handleSubmit = async (data: LoginForm) => {
    try {
      await loginWithEmail(data.email, data.password);
      navigate(lastVisitedPage || '/');
      clearLastVisitedPage();
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  // вынести в консту
  const fields = useMemo<FormField<LoginForm>[]>(
    () => [
      { name: 'email', label: 'Email', type: 'text' },
      { name: 'password', label: 'Password', type: 'password' },
    ],
    []
  );

  return (
    <AuthForm<LoginForm>
      title="Sign in to"
      fields={fields}
      submitButtonText="Sign in"
      alternateActionText="New to our platform?"
      alternateActionLink="/registration"
      onSubmit={handleSubmit}
      validationSchema={loginSchema}
    />
  );
};

export default Login;
