import { zodResolver } from '@hookform/resolvers/zod';
import { useMediaQuery, useTheme } from '@mui/material';
import { userStore } from '@store/UserStore';
import { RefObject, useEffect } from 'react';
import { FieldValues, useForm, UseFormReturn } from 'react-hook-form';
import { ZodSchema, ZodTypeDef } from 'zod';

export const useIntersectionObserver = (
  targetRef: RefObject<HTMLDivElement | null>,
  callback: () => void
) => {
  useEffect(() => {
    if (!targetRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        callback();
      }
    });

    const currentRef = targetRef.current;
    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [callback, targetRef]);
};

export const useDevice = () => {
  const theme = useTheme();

  return {
    isMobile: useMediaQuery(theme.breakpoints.down('sm')),
    isTablet: useMediaQuery(theme.breakpoints.between('sm', 'md')),
    isLaptop: useMediaQuery(theme.breakpoints.between('md', 'lg')),
    isDesktop: useMediaQuery(theme.breakpoints.up('lg')),
  };
};

export const useAuthForm = <T extends FieldValues>(
  validationSchema: ZodSchema<T, ZodTypeDef, Partial<T>>
): UseFormReturn<T> => {
  const form = useForm<T>({
    resolver: zodResolver(validationSchema),
    mode: 'onBlur',
    reValidateMode: 'onSubmit',
  });

  useEffect(() => {
    if (userStore.authError) {
      form.setError('root', { message: userStore.authError.message });
      userStore.clearAuthError();
    }
  }, [userStore.authError, form]);

  return form;
};
