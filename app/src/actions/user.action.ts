'use server';
import { updateUser } from '@packages/db/models/user';



// ============================================================================
// Authentication Actions
// ============================================================================

/**
 * Logs in a user using the provided form data.
 * @param formData - The form data containing user credentials.
 * @returns The result of the sign-in operation or an error.
 */
export const userUpdate = async ( id: string, formData: FormData) => {
  try {
    const rawFormData = {
      username: formData.get('username') as string,
      
    };

    return await updateUser(id, rawFormData);
  } catch (error) {
    console.error(error);
    return error as unknown as Error;
  }
};

