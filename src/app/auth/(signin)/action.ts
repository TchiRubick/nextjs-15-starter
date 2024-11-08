'use server';

import { signin } from "@packages/auth/src";

const handler = async (formData: FormData) => {
  const rawFormData = {
    identifier: formData.get('identifier') as string,
    password: formData.get('password') as string,
  };

  return await signin(rawFormData);
};

export default handler;