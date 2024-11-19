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
}));

// Ajout de la table de jointure
export const ProductAmenity = pgTable('product_amenity', (t) => ({
  id: t.serial('id').primaryKey(),
  productId: t
    .integer('product_id')
    .notNull()
    .references(() => Product.id),
  amenityId: t
    .integer('amenity_id')
    .notNull()
    .references(() => Amenity.id, { onDelete: 'cascade' }),
}));

export const ProductImage = pgTable('product_image', (t) => ({
  id: t.serial('id').primaryKey(),
  productId: t
    .integer('product_id')
    .notNull()
    .references(() => Product.id),
  imageId: t
    .integer('image_id')
    .notNull()
    .references(() => Image.id, { onDelete: 'cascade' }),
}));

// ============================================================================
// Scheduling & Bookings
// ============================================================================
export const Schedule = pgTable('schedule', (t) => ({
  id: t.serial('id').primaryKey(),
  productId: t
    .integer('product_id')
    .notNull()
    .references(() => Product.id),
  userId: t
    .text('user_id')
    .notNull()
    .references(() => User.id),
  startDate: t.timestamp('start_date', { withTimezone: true, mode: 'date' }),
  endDate: t.timestamp('end_date', { withTimezone: true, mode: 'date' }),
}));

// ============================================================================
// Relations
// ============================================================================
export const SessionRelations = relations(Session, ({ one }) => ({
  user: one(User, { fields: [Session.userId], references: [User.id] }),
}));

export const ScheduleRelations = relations(Schedule, ({ one }) => ({
  product: one(Product, {
    fields: [Schedule.productId],
    references: [Product.id],
  }),
  user: one(User, {
    fields: [Schedule.userId],
    references: [User.id],
  }),
}));

export const AmenityRelations = relations(Amenity, ({ many }) => ({
  productAmenities: many(ProductAmenity),
}));

export const ImageRelations = relations(Image, ({ many }) => ({
  productImages: many(ProductImage),
}));

export const ProductAmenityRelations = relations(ProductAmenity, ({ one }) => ({
  product: one(Product, {
    fields: [ProductAmenity.productId],
    references: [Product.id],
  }),
  amenity: one(Amenity, {
    fields: [ProductAmenity.amenityId],
    references: [Amenity.id],
  }),
}));

export const ProductImageRelations = relations(ProductImage, ({ one }) => ({
  product: one(Product, {
    fields: [ProductImage.productId],
    references: [Product.id],
  }),
  image: one(Image, {
    fields: [ProductImage.imageId],
    references: [Image.id],
  }),
}));

export const ProductRelations = relations(Product, ({ many }) => ({
  amenities: many(ProductAmenity),
  images: many(ProductImage),
  schedules: many(Schedule),
}));

export const UserRelations = relations(User, ({ many }) => ({
  schedules: many(Schedule),
  sessions: many(Session),
}));
