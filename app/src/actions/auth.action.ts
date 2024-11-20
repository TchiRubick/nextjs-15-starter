'use server';

import { invalidateSession } from '@/lib/invalidateSession';
import { getUser, signOut } from '@packages/auth/index';
import { signin, signup } from '@packages/auth/src';
import { SignupInput } from '@packages/auth/src/actions/types';
import { revalidatePath } from 'next/cache';

// ============================================================================
// Authentication Actions
// ============================================================================

/**
 * Logs in a user using the provided form data.
 * @param formData - The form data containing user credentials.
 * @returns The result of the sign-in operation or an error.
 */
export const loginMutation = async (formData: FormData) => {
  try {
    const rawFormData = {
      identifier: formData.get('identifier') as string,
      password: formData.get('password') as string,
    };

    return await signin(rawFormData);
  } catch (error) {
    console.error(error);
    return error as unknown as Error;
  }
};

/**
 * Registers a new user using the provided form data.
 * @param formData - The form data containing user registration details.
 * @returns The result of the sign-up operation or an error.
 */
export const registerMutation = async (formData: SignupInput) => {
  return await signup(formData);
};

/**
 * Logs out the current user and invalidates the session.
 * @returns A promise that resolves when the logout is complete.
 */
export const logoutMutation = async () => {
  try {
    await signOut();
    await invalidateSession();
    revalidatePath('/');
  } catch (error) {
    console.error(error);
    return error as unknown as Error;
  }
};

/**
 * Checks if the user is logged in.
 * @returns The user object if logged in, or null if not.
 */
export const isLoggedInQuery = async () => {
  try {
    return await getUser();
  } catch (error) {
    console.error(error);
    return null;
  }
};
