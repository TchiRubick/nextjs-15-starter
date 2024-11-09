import { relations } from 'drizzle-orm';
import { pgEnum, pgTable } from 'drizzle-orm/pg-core';

// ============================================================================
// Enums
// ============================================================================
export const UserRole = pgEnum('user_role', ['customer', 'admin']);
export const ProductStatus = pgEnum('product_status', ['draft', 'published']);

// ============================================================================
// Authentication & User Management
// ============================================================================
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
  role: UserRole().default('customer'),
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

// ============================================================================
// Product & Amenities
// ============================================================================
export const Amenity = pgTable('amenity', (t) => ({
  id: t.serial('id').primaryKey(),
  name: t.text('name').notNull(),
}));

export const Image = pgTable('image', (t) => ({
  id: t.serial('id').primaryKey(),
  url: t.text('url').notNull(),
  bucket: t.text('bucket').notNull(),
}));

export const Product = pgTable('product', (t) => ({
  id: t.serial('id').primaryKey(),
  name: t.text('name').notNull(),
  description: t.text('description').notNull(),
  price: t.integer('price').notNull(),
  status: ProductStatus().default('draft'),
  // Accommodation details
  bed: t.integer('bed'),
  bath: t.integer('bath'),
  maxPerson: t.integer('max_person'),
  room: t.integer('room').notNull(),
  // References
  amenities: t.integer('amenities').references(() => Amenity.id),
  images: t.integer('images').references(() => Image.id),
}));

// ============================================================================
// Scheduling & Bookings
// ============================================================================
export const Schedule = pgTable('schedule', (t) => ({
  id: t.serial('id').primaryKey(),
  productId: t.integer('productId').notNull(),
  startDate: t.timestamp('startDate', { withTimezone: true, mode: 'date' }),
  endDate: t.timestamp('endDate', { withTimezone: true, mode: 'date' }),
}));

export const UserSchedule = pgTable('user_schedule', (t) => ({
  id: t.serial('id').primaryKey(),
  userId: t
    .text('user_id')
    .notNull()
    .references(() => User.id),
  scheduleId: t.integer('scheduleId').notNull(),
}));

// ============================================================================
// Relations
// ============================================================================
export const SessionRelations = relations(Session, ({ one, many }) => ({
  user: one(User, { fields: [Session.userId], references: [User.id] }),
  schedules: many(UserSchedule),
}));

export const ScheduleRelations = relations(Schedule, ({ one }) => ({
  product: one(Product, {
    fields: [Schedule.productId],
    references: [Product.id],
  }),
}));

export const ProductRelations = relations(Product, ({ many }) => ({
  amenities: many(Amenity),
  images: many(Image),
  schedules: many(Schedule),
}));
