import { redirect } from 'next/navigation';

import { createUser } from '@packages/db/models/user';
import { revalidatePath } from 'next/cache';
import { SIGNUP_ERRORS, SignupInput } from './types';
import {
  checkExistingUser,
  createAndSetSessionCookie,
  hashPassword,
  validateInputSignup,
} from './utils';

// Main signup function
export async function signup(input: SignupInput) {
  // Validate input
  const validatedInput = validateInputSignup(input);
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
  await createAndSetSessionCookie(userData.id);

  revalidatePath('/');
  return redirect('/');
}
