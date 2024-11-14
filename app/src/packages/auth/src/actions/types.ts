import { z } from 'zod';

import InternalError from '@/lib/error';

export const signinSchema = z.object({
  identifier: z
    .string()
    .min(3, 'Identifier must be at least 3 characters')
    .max(255, 'Identifier must be less than 255 characters'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(255, 'Password must be less than 255 characters'),
});

export type SigninInput = z.infer<typeof signinSchema>;

// Constants
export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: new InternalError(
    'Invalid credentials',
    'INVALID_CREDENTIALS'
  ),
  VALIDATION_ERROR: new InternalError('Validation error', 'VALIDATION_ERROR'),
  USER_NOT_FOUND: new InternalError('User not found', 'USER_NOT_FOUND'),
} as const;

export const signupSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(31, 'Username must be less than 31 characters')
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      'Username can only contain letters, numbers, underscores, and dashes'
    ),
  email: z.string().email('Invalid email address').toLowerCase(),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(255, 'Password must be less than 255 characters'),
});

export type SignupInput = z.infer<typeof signupSchema>;

// Constants
export const SIGNUP_ERRORS = {
  USERNAME_TAKEN: new InternalError('Username already taken', 'USERNAME_TAKEN'),
  EMAIL_TAKEN: new InternalError('Email already taken', 'EMAIL_TAKEN'),
  CREATION_FAILED: new InternalError(
    'Failed to create user',
    'CREATION_FAILED',
    500
  ),
  VALIDATION_FAILED: new InternalError(
    'Validation failed',
    'VALIDATION_FAILED'
  ),
} as const;

export const HASH_OPTIONS = {
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
} as const;
