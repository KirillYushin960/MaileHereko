import { Control, Controller, FieldValues, Path, UseFormClearErrors } from 'react-hook-form';
import { Input } from '@components/Input';
import { FormErrors } from '@types';

type FormInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  type?: string;
  error?: FormErrors<T>[Path<T>];
  helperText?: string;
  endIcon?: string;
  onEndIconClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearErrors: UseFormClearErrors<T>;
};

export const FormInput = <T extends FieldValues>({
  control,
  name,
  label,
  type = 'text',
  error,
  helperText,
  endIcon,
  onEndIconClick,
  onChange,
  clearErrors,
}: FormInputProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <Input
        {...field}
        label={label}
        type={type}
        error={!!error}
        helperText={error?.message || helperText}
        endIcon={endIcon}
        endIconClick={onEndIconClick}
        onChange={(e) => {
          field.onChange(e);
          clearErrors(name);
          onChange?.(e);
        }}
      />
    )}
  />
);
