import { eq } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { db } from '../..';
import { User } from '../schema';

// ============================================================================
// Schemas
// ============================================================================
export const zInsertUser = createInsertSchema(User, {
  username: z.string().min(1),
  email: z.string().email().readonly(),
  phone: z.string().min(10),
  address: z.string().min(5),
  city: z.string().min(4),
  country: z.string().min(4),
  zipCode: z.string().min(2),
  password: z.string().min(6),
});

export const zSelectUser = createSelectSchema(User).omit({
  password: true,
});

export const zUpdateUser = zInsertUser.pick({
  username: true,
  phone: true,
  address: true,
});

// ============================================================================
// Types
// ============================================================================
export type InsertUser = z.infer<typeof zInsertUser>;
export type UpdateUser = z.infer<typeof zUpdateUser>;
export type UserSelect = z.infer<typeof zSelectUser>;

// ============================================================================
// Queries
// ============================================================================
/**
 * Get user by their unique username
 */
export const getUserByUsername = async (username: string) =>
  db.query.User.findFirst({
    where: (row, { eq }) => eq(row.username, username),
  });

/**
 * Get user by their unique email
 */
export const getUserByEmail = async (email: string) =>
  db.query.User.findFirst({
    where: (q, { eq }) => eq(q.email, email),
  });

/**
 * Get user by either email or username
 */
export const getUserByIdentifierEmailUsername = (identifier: string) =>
  db.query.User.findFirst({
    where: (q, { eq, or }) =>
      or(eq(q.email, identifier), eq(q.username, identifier)),
  });

/**
 * Create a new user
 */
export const createUser = async (input: InsertUser) =>
  db.insert(User).values(input).returning();

/**
 * Update an existing user
 */
export const updateUser = async (id: string, input: UpdateUser) =>
  db.update(User).set(input).where(eq(User.id, id)).returning();

/**
 * Delete a user
 */
export const deleteUser = async (id: string) =>
  db.delete(User).where(eq(User.id, id)).returning();

/**
 * Get all users (typically for admin purposes)
 */
export const getAllUsers = async () =>
  db.query.User.findMany({
    columns: {
      password: false,
    },
  });

/**
 * Get user by ID
 */
export const getUserById = async (id: string) =>
  db.query.User.findFirst({
    where: (user, { eq }) => eq(user.id, id),
    columns: {
      password: false,
    },
  });
