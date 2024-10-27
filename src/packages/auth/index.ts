import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { Lucia } from 'lucia';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { db } from '@packages/db';
import type { UserSelect } from '@packages/db/models/user';
import { Session, User } from '@packages/db/schema';

const adapter = new DrizzlePostgreSQLAdapter(db, Session, User);

export const auth = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === 'production',
    },
  },
  getUserAttributes: (attributes) => {
    return {
      email: attributes.email,
      username: attributes.username,
      id: attributes.id,
      image: attributes.image,
      emailVerified: attributes.emailVerified,
    };
  },
});

// IMPORTANT!
declare module 'lucia' {
  interface Register {
    Lucia: typeof auth;
    DatabaseUserAttributes: UserSelect;
  }
}

export const isAuth = async () => {
  const cookie = await cookies();

  const luciaSession = await auth.validateSession(
    cookie.get(auth.sessionCookieName)?.value ?? ''
  );

  return luciaSession;
};

export const pageGuard = async (redirectPath = '/') => {
  const luciaSession = await isAuth();

  const { session } = luciaSession;

  if (session === null) {
    redirect(redirectPath);
  }

  if (session.expiresAt < new Date()) {
    redirect(redirectPath);
  }
};
