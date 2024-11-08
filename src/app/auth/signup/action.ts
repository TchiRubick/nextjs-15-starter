'use server';

import { signup } from '@packages/auth/src';

const handler = async (formData: FormData) => {
  const rawFormData = {
    username: formData.get('username') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  return await signup(rawFormData);
};

export default handler;
