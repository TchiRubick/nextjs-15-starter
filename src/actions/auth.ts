'use server';

import { signOut } from "@packages/auth/index";
import { signin, signup } from "@packages/auth/src";
import { getUser } from "@packages/auth/index";

export const login = async (formData: FormData) => {
  const rawFormData = {
    identifier: formData.get('identifier') as string,
    password: formData.get('password') as string,
  };

  return await signin(rawFormData);
};

export const register = async (formData: FormData) => {
  const rawFormData = {
    username: formData.get('username') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  return await signup(rawFormData);
};

export const logout = async () => {
  return await signOut();
};

export const isLoggedIn = async () => {
  return await getUser();
};

