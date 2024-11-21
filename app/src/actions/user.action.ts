'use server';

import { updateUser } from '@packages/db/models/user';
import { isLoggedInQuery } from './auth.action';

export const userUpdate = async ( formData: FormData) => {
  const user = await isLoggedInQuery();

  if (!user) {
    throw new Error('You must be logged in to update your profile');
  }

  const id = user.id;

  const username = formData.get('username');

  if (!username || typeof username !== 'string' || !username.trim()) {
    throw new Error('Username is required');
  }

  try {
    const rawFormData = {
      username: username.trim(),
    };

    return await updateUser(id, rawFormData);
  } catch (error) {
    console.error('Failed to update user:', {
      userId: id,
      error: error instanceof Error ? error.message : error,
    });
    throw new Error('Failed to update user. Please try again.');
  }
};
