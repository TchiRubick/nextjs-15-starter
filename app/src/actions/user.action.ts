'use server';

import { updateUser } from '@packages/db/models/user';

export const userUpdate = async (id: string, formData: FormData) => {
  if (!id?.trim()) {
    throw new Error('User ID is required');
  }

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
