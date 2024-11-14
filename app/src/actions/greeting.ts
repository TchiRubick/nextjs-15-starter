'use server';

import { redirect } from 'next/navigation';

export const greeting = async (name: string) => {
  return { type: `${new Date().toISOString()} ${name}` };
};

export const testRedirect = async (t: string, b: string) => {
  console.log(t, b);

  redirect('/not-found');
};
