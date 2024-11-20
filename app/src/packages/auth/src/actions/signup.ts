import { invalidateSession } from '@/lib/invalidateSession';
import { createUser } from '@packages/db/models/user';
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

  const { username, email, password, phone, address, city, country, zipCode } =
    validatedInput;

  console.log('validatedInput', validatedInput);

  // Check for existing users
  await checkExistingUser(username, email);

  // Hash password
  const passwordHash = await hashPassword(password);

  // Create user
  const [user] = await createUser({
    username,
    email,
    phone,
    address,
    city,
    country,
    zipCode,
    password: passwordHash,
  });

  if (!user) {
    throw SIGNUP_ERRORS.CREATION_FAILED;
  }

  // Create session
  const { password: _password, ...userData } = user;
  await createAndSetSessionCookie(userData.id);
  await invalidateSession();
}
