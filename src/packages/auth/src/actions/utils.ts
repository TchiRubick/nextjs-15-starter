import InternalError from "@/lib/error";
import { hash, verify } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { auth } from "../..";

import { getUserByEmail, getUserByUsername } from "@packages/db/models/user";
import { AUTH_ERRORS, HASH_OPTIONS, SigninInput, signinSchema, SIGNUP_ERRORS, SignupInput, signupSchema } from "./types";

// Helpers
export const validateInputSignin = (input: SigninInput) => {
  const result = signinSchema.safeParse(input);

  if (!result.success) {
    const errorMessage = result.error.errors
      .map((err) => err.message)
      .join(', ');
    throw new InternalError(errorMessage, 'VALIDATION_ERROR');
  }

  return result.data;
};

export const verifyPassword = async (
  hashedPassword: string,
  inputPassword: string
) => {
  try {
    const isValid = await verify(hashedPassword, inputPassword);
    if (!isValid) throw AUTH_ERRORS.INVALID_CREDENTIALS;
    return isValid;
  } catch (error) {
    console.error('Password verification error:', error);
    throw AUTH_ERRORS.INVALID_CREDENTIALS;
  }
};

export const createAndSetSessionCookie = async (userId: string) => {
  try {
    const session = await auth.createSession(userId, {});
    const sessionCookie = auth.createSessionCookie(session.id);
    const cookieStore = await cookies();

    cookieStore.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return session;
  } catch (error) {
    console.error('Session creation error:', error);
    throw new InternalError('Failed to create session', 'SESSION_ERROR');
  }
};

export const validateInputSignup = (input: SignupInput) => {
  const result = signupSchema.safeParse(input);

  if (!result.success) {
    const errorMessage = result.error.errors
      .map((err) => err.message)
      .join(', ');
    throw new InternalError(errorMessage, 'VALIDATION_FAILED');
  }

  return result.data;
};

export const checkExistingUser = async (username: string, email: string) => {
  const [existingUsername, existingEmail] = await Promise.all([
    getUserByUsername(username),
    getUserByEmail(email),
  ]);

  if (existingUsername) throw SIGNUP_ERRORS.USERNAME_TAKEN;
  if (existingEmail) throw SIGNUP_ERRORS.EMAIL_TAKEN;
};

export const hashPassword = async (password: string): Promise<string> => {
  try {
    return await hash(password, HASH_OPTIONS);
  } catch (error) {
    console.error('Password hashing error:', error);
    throw new InternalError('Password processing failed', 'HASH_FAILED', 500);
  }
};
