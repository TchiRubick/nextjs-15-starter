import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { db } from '../..';
import { User } from '../schema';

export const zInsertUser = createInsertSchema(User, {
  username: z.string(),
  email: z.string().email().readonly(),
});

export const zSelectUser = createSelectSchema(User).omit({
  password: true,
});

export const zUpdateUser = zInsertUser.pick({
  username: true,
});

export type InsertUser = z.infer<typeof zInsertUser>;

export type UpdateUser = z.infer<typeof zUpdateUser>;

export type UserSelect = z.infer<typeof zSelectUser>;

export const getUserByUsername = async (username: string) =>
  db.query.User.findFirst({
    where: (row, { eq }) => eq(row.username, username),
  });

export const getUserByEmail = async (email: string) =>
  db.query.User.findFirst({
    where: (q, { eq }) => eq(q.email, email),
  });

export const createUser = async (input: InsertUser) =>
  db.insert(User).values(input).returning();

export const getUserByIdentifierEmailUsername = (identifier: string) =>
  db.query.User.findFirst({
    where: (q, { eq, or }) =>
      or(eq(q.email, identifier), eq(q.username, identifier)),
  });
