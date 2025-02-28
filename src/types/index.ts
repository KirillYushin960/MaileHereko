import { content } from '@constants';
import { loginSchema, registerSchema } from '@schemas';
import { z } from 'zod';
import { FieldError, FieldValues, Path } from 'react-hook-form';

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

export type MenuItem = {
  path: string;
  label: string;
  requiresAuth?: boolean;
};

export type FormErrors<T> = {
  [K in keyof T]?: FieldError;
} & { root?: { message: string } };

export type FormField<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  type: 'text' | 'password';
};

export type FavoriteItem = {
  mediaId: string;
  title: string;
  image: string;
  rating: number;
};

type createdAtType = {
  seconds: number;
  nanoseconds: number;
};

export type CommentItem = {
  authorId: string;
  authorImage: string;
  authorName: string;
  createdAt: createdAtType;
  likes: number;
  mediaId: number;
  text: string;
};
