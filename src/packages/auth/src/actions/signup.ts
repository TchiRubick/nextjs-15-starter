'use server';
import { hash } from '@node-rs/argon2';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import {
  createUser,
  getUserByEmail,
  getUserByUsername,
} from '@packages/db/models/user';
import { auth } from '../..';

const signupValidation = z.object({
  username: z.string().min(3).max(31),
  email: z.string().email(),
  password: z.string().min(6).max(255),
});

type SignupValidation = z.infer<typeof signupValidation>;

export const signup = async (input: SignupValidation) => {
  const cookie = await cookies();

  const { error } = signupValidation.safeParse(input);

  if (error) {
    throw new Error(error.message);
  }

  const { username, email, password } = input;

  const userUsername = await getUserByUsername(username);

  if (userUsername) {
    throw new Error('Username already taken');
  }

  const userEmail = await getUserByEmail(email);

  if (userEmail) {
    throw new Error('Username already taken');
  }

  const passwordHash = await hash(password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });

  const [user] = await createUser({ username, email, password: passwordHash });

  if (!user) {
    throw new Error('Error creating user');
  }

  const { password: _password, ...rest } = user;

  const session = await auth.createSession(rest.id, { ...rest });
  const sessionCookie = auth.createSessionCookie(session.id);

  cookie.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  return redirect('/');
};
