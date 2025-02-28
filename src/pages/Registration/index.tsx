/* eslint-disable no-console */
import { AuthForm } from '@components/AuthForm';
import { useNavigate } from 'react-router-dom';
import { userStore } from '@store/UserStore';
import { FormField, RegisterForm } from '@types';
import { registerSchema } from '@schemas';
import { useMemo } from 'react';

const Registration = () => {
  const navigate = useNavigate();

  const { registerWithEmail, lastVisitedPage, clearLastVisitedPage } = userStore;

  const handleSubmit = async (data: RegisterForm) => {
    try {
      await registerWithEmail(data.email, data.password, data.firstName, data.lastName);
      navigate(lastVisitedPage || '/');
      clearLastVisitedPage();
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  // вынести в консту
  const fields = useMemo<FormField<RegisterForm>[]>(
    () => [
      { name: 'firstName', label: 'First Name', type: 'text' },
      { name: 'lastName', label: 'Last Name', type: 'text' },
      { name: 'email', label: 'Email', type: 'text' },
      { name: 'password', label: 'Password', type: 'password' },
      { name: 'confirmPassword', label: 'Confirm Password', type: 'password' },
    ],
    []
  );

  return (
    <AuthForm
      title="Sign up to"
      fields={fields}
      submitButtonText="Sign up"
      alternateActionText="Already have an account?"
      alternateActionLink="/login"
      onSubmit={handleSubmit}
      validationSchema={registerSchema}
    />
  );
};

export default Registration;
