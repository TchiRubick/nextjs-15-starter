'use server';

import { UpdateUser, updateUser } from '@packages/db/models/user';
import { isLoggedInQuery } from './auth.action';

export const userUpdate = async (formData: UpdateUser) => {
  const user = await isLoggedInQuery();

  if (user === null || user === undefined) {
    throw new Error('You must be logged in to update your profile');
  }
  const id = user?.id;

  if (!id) {
    throw new Error('You must be logged in to update your profile');
  }

  return await updateUser(id, formData);
};
