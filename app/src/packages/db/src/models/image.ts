import { eq } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { db } from '../..';
import { Image } from '../schema';

// ============================================================================
// Schemas
// ============================================================================
export const zInsertImage = createInsertSchema(Image, {
  url: z.string().min(1),
});

export const zSelectImage = createSelectSchema(Image);

export const zUpdateImage = zInsertImage.pick({
  url: true,
});

export const amenities = zInsertImage.shape;

// ============================================================================
// Types
// ============================================================================
export type InsertImage = z.infer<typeof zInsertImage>;
export type UpdateImage = z.infer<typeof zUpdateImage>;
export type ImageSelect = z.infer<typeof zSelectImage>;

// ============================================================================
// Queries
// ============================================================================
export const getImageById = async (id: number) =>
  db.query.Image.findFirst({
    where: (Image, { eq }) => eq(Image.id, id),
  });

export const createImage = async (input: InsertImage) =>
  db.insert(Image).values(input).returning();

export const createMassImage = async (input: InsertImage[]) =>
  db.insert(Image).values(input).returning();

export const updateImage = async (id: number, input: UpdateImage) =>
  db.update(Image).set(input).where(eq(Image.id, id)).returning();

export const deleteImage = async (id: number) =>
  db.delete(Image).where(eq(Image.id, id)).returning();
