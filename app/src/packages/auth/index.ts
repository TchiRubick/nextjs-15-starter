import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { Lucia } from 'lucia';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { db } from '@packages/db';
import type { UserSelect } from '@packages/db/models/user';
import { Session, User } from '@packages/db/schema';

type AuthConfig = {
  sessionCookie: {
    attributes: {
      secure: boolean;
    };
  };
  getUserAttributes: (attributes: UserSelect) => Partial<UserSelect>;
};

type GuardOptions = {
  redirectPath?: string;
  requireVerified?: boolean;
};

const DEFAULT_REDIRECT_PATH = '/';
const DEFAULT_GUARD_OPTIONS: GuardOptions = {
  redirectPath: DEFAULT_REDIRECT_PATH,
  requireVerified: false,
};

// Auth Configuration
const createAuthConfig = (): AuthConfig => ({
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === 'production',
    },
  },
  getUserAttributes: (attributes) => ({
    email: attributes.email,
    username: attributes.username,
    id: attributes.id,
    image: attributes.image,
    emailVerified: attributes.emailVerified,
    role: attributes.role,
  }),
});

// Auth Instance
const createAuthInstance = () => {
  const adapter = new DrizzlePostgreSQLAdapter(db, Session, User);
  return new Lucia(adapter, createAuthConfig());
};

export const auth = createAuthInstance();

// IMPORTANT: Type augmentation for Lucia
declare module 'lucia' {
  interface Register {
    Lucia: typeof auth;
    DatabaseUserAttributes: UserSelect;
  }
}

// Auth Utilities
const getSessionFromCookie = async () => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(auth.sessionCookieName)?.value ?? '';
  return auth.validateSession(sessionCookie);
};

const isSessionValid = (session: { expiresAt: Date } | null): boolean => {
  if (!session) return false;
  return new Date(session.expiresAt) > new Date();
};

// Exported Functions
export const isAuth = async () => {
  try {
    return await getSessionFromCookie();
  } catch (error) {
    console.error('Auth validation error:', error);
    return { session: null, user: null };
  }
};

export const pageGuard = async (
  options: GuardOptions = DEFAULT_GUARD_OPTIONS
) => {
  try {
    const { redirectPath = DEFAULT_REDIRECT_PATH, requireVerified = false } =
      options;
    const { session, user } = await isAuth();

    if (!session || !isSessionValid(session)) {
      redirect(redirectPath);
    }

    if (requireVerified && !user?.emailVerified) {
      redirect('/verify-email');
    }

    return { session, user };
  } catch (error) {
    console.error('Page guard error:', error);
    redirect(DEFAULT_REDIRECT_PATH);
  }
};

export const pageOrphanGuard = async (
  options: GuardOptions = DEFAULT_GUARD_OPTIONS
) => {
  const { redirectPath = DEFAULT_REDIRECT_PATH } = options;
  const { session, user } = await isAuth();

  if (session && isSessionValid(session)) {
    redirect(redirectPath);
  }

  return { session, user };
};

export const adminGuard = async (
  options: GuardOptions = DEFAULT_GUARD_OPTIONS
) => {
  try {
    const { redirectPath = DEFAULT_REDIRECT_PATH, requireVerified = false } =
      options;
    const { session, user } = await isAuth();

    if (!session || !isSessionValid(session)) {
      redirect(redirectPath);
    }

    if (requireVerified && !user?.emailVerified) {
      redirect('/verify-email');
    }
    console.log('user', user);
    if (user?.role !== 'admin') {
      redirect('/');
    }

    return { session, user };
  } catch (error) {
    console.error('Page admin guard error:', error);
    redirect(DEFAULT_REDIRECT_PATH);
  }
};

export const getUser = async () => {
  const { user } = await isAuth();
  return user;
};

export const isLoggedInAdminOrThrow = async () => {
  const { user } = await isAuth();

  if (!user) {
    throw new Error('User not logged in');
  }

  if (user.role !== 'admin') {
    throw new Error('User not admin');
  }

  return user;
};

export const isLoggedInOrThrow = async () => {
  const { user } = await isAuth();

  if (!user) {
    throw new Error('User not logged in');
  }

  return user;
};

export const signOut = async () => {
  const { session } = await isAuth();

  if (session) {
    await auth.invalidateSession(session.id);
  }
};
