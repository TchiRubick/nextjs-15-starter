import 'server-only';

import { verify } from '@node-rs/argon2';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { getUserByIdentifierEmailUsername } from '@packages/db/models/user';
import { auth } from '../..';

const signinValidation = z.object({
  identifier: z.string().min(3).max(255),
  password: z.string().min(6).max(255),
});

type SigninValidation = z.infer<typeof signinValidation>;

export const signin = async (input: SigninValidation) => {
  const cookie = await cookies();

  const { error } = signinValidation.safeParse(input);

  if (error) {
    throw new Error(error.message);
  }

  const user = await getUserByIdentifierEmailUsername(input.identifier);

  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordValid = await verify(user.password, input.password);

  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  const session = await auth.createSession(user.id, {});
  const sessionCookie = auth.createSessionCookie(session.id);

  cookie.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  return redirect('/');
};
