import 'server-only';

import { verify } from '@node-rs/argon2';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import InternalError from '@/lib/error';
import { getUserByIdentifierEmailUsername } from '@packages/db/models/user';
import { auth } from '../..';

// Types
const signinSchema = z.object({
  identifier: z
    .string()
    .min(3, 'Identifier must be at least 3 characters')
    .max(255, 'Identifier must be less than 255 characters'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(255, 'Password must be less than 255 characters'),
});

type SigninInput = z.infer<typeof signinSchema>;

// Constants
const AUTH_ERRORS = {
  INVALID_CREDENTIALS: new InternalError(
    'Invalid credentials',
    'INVALID_CREDENTIALS'
  ),
  VALIDATION_ERROR: new InternalError('Validation error', 'VALIDATION_ERROR'),
  USER_NOT_FOUND: new InternalError('User not found', 'USER_NOT_FOUND'),
} as const;

// Helpers
const validateInput = (input: SigninInput) => {
  const result = signinSchema.safeParse(input);

  if (!result.success) {
    const errorMessage = result.error.errors
      .map((err) => err.message)
      .join(', ');
    throw new InternalError(errorMessage, 'VALIDATION_ERROR');
  }

  return result.data;
};

const verifyPassword = async (
  hashedPassword: string,
  inputPassword: string
) => {
  try {
    const isValid = await verify(hashedPassword, inputPassword);
    if (!isValid) throw AUTH_ERRORS.INVALID_CREDENTIALS;
    return isValid;
  } catch (error) {
    console.error('Password verification error:', error);
    throw AUTH_ERRORS.INVALID_CREDENTIALS;
  }
};

const createAndSetSessionCookie = async (userId: string) => {
  try {
    const session = await auth.createSession(userId, {});
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
    throw new InternalError('Failed to create session', 'SESSION_ERROR');
  }
};

// Main signin function
export async function signin(input: SigninInput) {
  try {
    // Validate input
    const validatedInput = validateInput(input);

    // Get user
    const user = await getUserByIdentifierEmailUsername(
      validatedInput.identifier
    );
    if (!user) {
      throw AUTH_ERRORS.USER_NOT_FOUND;
    }

    // Verify password
    await verifyPassword(user.password, validatedInput.password);

    // Create and set session
    await createAndSetSessionCookie(user.id);

    // Redirect on success
    return redirect('/');
  } catch (error) {
    if (error instanceof InternalError) {
      throw error;
    }

    console.error('Signin error:', error);
    throw AUTH_ERRORS.INVALID_CREDENTIALS;
  }
}

// Optional: Export types and errors for use in components
export { AUTH_ERRORS };
export type { SigninInput };
