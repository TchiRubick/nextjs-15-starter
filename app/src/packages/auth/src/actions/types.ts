import { z } from 'zod';

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
  INVALID_CREDENTIALS: new Error('Invalid credentials'),
  VALIDATION_ERROR: new Error('Validation error'),
  USER_NOT_FOUND: new Error('User not found'),
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
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(4, 'City must be at least 4 characters'),
  country: z.string().min(4, 'Country must be at least 4 characters'),
  zipCode: z.string().min(2, 'Zip code must be at least 2 characters'),
});

export type SignupInput = z.infer<typeof signupSchema>;

// Constants
export const SIGNUP_ERRORS = {
  USERNAME_TAKEN: new Error('Username already taken'),
  EMAIL_TAKEN: new Error('Email already taken'),
  CREATION_FAILED: new Error('Failed to create user'),
  VALIDATION_FAILED: new Error('Validation failed'),
} as const;

export const HASH_OPTIONS = {
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
} as const;
