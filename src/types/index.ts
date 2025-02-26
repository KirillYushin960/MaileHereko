import { content } from '@constants';
import { loginSchema, registerSchema } from '@schemas';
import { z } from 'zod';

export type OpacityColors = {
  100: string;
  75: string;
  65: string;
  50: string;
  40: string;
  30: string;
  20: string;
  10: string;
};

export interface PageFilter {
  inputValue: string;
}

export type Content = (typeof content)[number];

export type RegisterForm = z.infer<typeof registerSchema>;

export type LoginForm = z.infer<typeof loginSchema>;
