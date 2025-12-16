import { Box, Typography } from '@mui/material';
import { style } from './style';
import { Button } from '@components/Button';
import { projectName } from '@constants';
import { observer } from 'mobx-react-lite';
import { FormInput } from '@components/FormInput';
import { useAuthForm } from '@hooks';
import { FormField } from '@types';
import { KeyboardEvent, useState } from 'react';
import { AuthActions } from '@components/AuthActions';
import { FieldValues, FieldError, Path } from 'react-hook-form';
import { z } from 'zod';
import RevealedPassword from '@assets/icons/eye.svg';
import HiddenPassword from '@assets/icons/eye-slash.svg';

interface IAuthForm<T extends FieldValues> {
  title: string;
  fields: FormField<T>[];
  submitButtonText: string;
  alternateActionText: string;
  alternateActionLink: '/login' | '/registration';
  onSubmit: (data: T) => Promise<void>;
  validationSchema: z.ZodSchema<T, z.ZodTypeDef, Partial<T>>;
}

export const AuthForm = observer(
  <T extends FieldValues>({
    title,
    fields,
    submitButtonText,
    alternateActionText,
    alternateActionLink,
    onSubmit,
    validationSchema,
  }: IAuthForm<T>) => {
    const { handleSubmit, control, formState, clearErrors } = useAuthForm<T>(validationSchema);
    const { isSubmitting, errors } = formState;

    const [passwordVisibility, setPasswordVisibility] = useState<Record<string, boolean>>({});

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter') handleSubmit(onSubmit)();
    };

    const togglePasswordVisibility = (fieldName: Path<T>) => {
      setPasswordVisibility((prev) => ({
        ...prev,
        [fieldName]: !prev[fieldName],
      }));
    };

    return (
      <Box sx={style.container} onKeyDown={handleKeyDown}>
        <Typography variant="h4" sx={style.header}>
          {title} {projectName}
        </Typography>

        <Box sx={style.inputContainer}>
          {fields.map((field) => (
            <FormInput
              key={field.name.toString()}
              control={control}
              label={field.label}
              name={field.name}
              type={
                field.type === 'password' && passwordVisibility[field.name] ? 'text' : field.type
              }
              error={errors[field.name] as FieldError}
              helperText={(errors[field.name] as FieldError)?.message}
              clearErrors={clearErrors}
              endIcon={
                field.type === 'password'
                  ? passwordVisibility[field.name]
                    ? HiddenPassword
                    : RevealedPassword
                  : undefined
              }
              onEndIconClick={() => togglePasswordVisibility(field.name)}
            />
          ))}

          {errors.root && (
            <Typography variant="body2" color="error" sx={style.rootError}>
              {errors.root.message}
            </Typography>
          )}
        </Box>

        <Button onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>
          {submitButtonText}
        </Button>

        <AuthActions
          alternateActionText={alternateActionText}
          alternateActionLink={alternateActionLink}
          isSubmitting={isSubmitting}
        />
      </Box>
    );
  }
);
