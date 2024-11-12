import { invalidateSession } from '@/lib/invalidateSession';
import { getUserByIdentifierEmailUsername } from '@packages/db/models/user';
import { AUTH_ERRORS, SigninInput } from './types';
import {
  createAndSetSessionCookie,
  validateInputSignin,
  verifyPassword,
} from './utils';

// Main signin function
export async function signin(input: SigninInput) {
  // Validate input
  const validatedInput = validateInputSignin(input);

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
  await invalidateSession();
}
