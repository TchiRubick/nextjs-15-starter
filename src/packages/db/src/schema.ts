import { relations } from 'drizzle-orm';
import { pgTable } from 'drizzle-orm/pg-core';

export const User = pgTable('user', (t) => ({
  id: t
    .text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  username: t.varchar({ length: 255 }).notNull(),
  password: t.varchar({ length: 255 }).notNull(),
  email: t.varchar({ length: 255 }).notNull(),
  emailVerified: t.timestamp({ mode: 'date', withTimezone: true }),
  image: t.varchar({ length: 255 }),
  cursomerId: t.varchar({ length: 255 }),
}));

export const Session = pgTable('session', (t) => ({
  id: t.text('id').primaryKey(),
  userId: t
    .text('user_id')
    .notNull()
    .references(() => User.id),
  expiresAt: t
    .timestamp('expires_at', {
      withTimezone: true,
      mode: 'date',
    })
    .notNull(),
}));

export const SessionRelations = relations(Session, ({ one }) => ({
  user: one(User, { fields: [Session.userId], references: [User.id] }),
}));

export const Plan = pgTable('plan', (t) => ({
  id: t.serial('id').primaryKey(),
  productId: t.integer('productId').notNull(),
  productName: t.text('productName'),
  variantId: t.integer('variantId').notNull().unique(),
  name: t.text('name').notNull(),
  description: t.text('description'),
  price: t.text('price').notNull(),
  isUsageBased: t.boolean('isUsageBased').default(false),
  interval: t.text('interval'),
  intervalCount: t.integer('intervalCount'),
  trialInterval: t.text('trialInterval'),
  trialIntervalCount: t.integer('trialIntervalCount'),
  sort: t.integer('sort'),
}));
