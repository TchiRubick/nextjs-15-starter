import { hash } from '@node-rs/argon2';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import InternalError from '@/lib/error';
import {
  createUser,
  getUserByEmail,
  getUserByUsername,
} from '@packages/db/models/user';
import { auth } from '../..';

// Types & Schemas
const signupSchema = z.object({
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

type SignupInput = z.infer<typeof signupSchema>;

// Constants
const SIGNUP_ERRORS = {
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

const HASH_OPTIONS = {
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
} as const;

// Helpers
const validateInput = (input: SignupInput) => {
  const result = signupSchema.safeParse(input);

  if (!result.success) {
    const errorMessage = result.error.errors
      .map((err) => err.message)
      .join(', ');
    throw new InternalError(errorMessage, 'VALIDATION_FAILED');
  }

  return result.data;
};

const checkExistingUser = async (username: string, email: string) => {
  const [existingUsername, existingEmail] = await Promise.all([
    getUserByUsername(username),
    getUserByEmail(email),
  ]);

  if (existingUsername) throw SIGNUP_ERRORS.USERNAME_TAKEN;
  if (existingEmail) throw SIGNUP_ERRORS.EMAIL_TAKEN;
};

const hashPassword = async (password: string): Promise<string> => {
  try {
    return await hash(password, HASH_OPTIONS);
  } catch (error) {
    console.error('Password hashing error:', error);
    throw new InternalError('Password processing failed', 'HASH_FAILED', 500);
  }
};

const createUserSession = async (
  userId: string,
  userData: Omit<SignupInput, 'password'>
) => {
  try {
    const session = await auth.createSession(userId, userData);
    const sessionCookie = auth.createSessionCookie(session.id);
    const cookieStore = await cookies();

    cookieStore.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return session;
  } catch (error) {
    console.error('Session creation error:', error);
    throw new InternalError('Failed to create session', 'SESSION_FAILED', 500);
  }
};

// Main signup function
export async function signup(input: SignupInput) {
  // Validate input
  const validatedInput = validateInput(input);
  const { username, email, password } = validatedInput;

  // Check for existing users
  await checkExistingUser(username, email);

  // Hash password
  const passwordHash = await hashPassword(password);

  // Create user
  const [user] = await createUser({
    username,
    email,
    password: passwordHash,
  });

  if (!user) {
    throw SIGNUP_ERRORS.CREATION_FAILED;
  }

  // Create session
  const { password: _password, ...userData } = user;
  await createUserSession(userData.id, userData);

  return redirect('/');
}

// Exports
export { SIGNUP_ERRORS };
export type { SignupInput };
