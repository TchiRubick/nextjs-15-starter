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

// ============================================================================
// Types
// ============================================================================
export type InsertImage = z.infer<typeof zInsertImage>;
export type UpdateImage = z.infer<typeof zUpdateImage>;
export type ImageSelect = z.infer<typeof zSelectImage>;

// ============================================================================
// Queries
// ============================================================================
export const createImage = async (input: InsertImage) =>
  db.insert(Image).values(input).returning();

export const createMassImage = async (input: InsertImage[]) =>
  db.insert(Image).values(input).returning();

export const updateImage = async (id: number, input: UpdateImage) =>
  db.update(Image).set(input).where(eq(Image.id, id)).returning();

export const deleteImageByUrl = async (url: string) =>
  db.delete(Image).where(eq(Image.url, url)).returning();

export const getAllUrlImage = async () => {
<<<<<<< HEAD
  return db.select().from(Image);
};
=======
   return db.select().from(Image);
} 
>>>>>>> 5cb7d4e (chore : add getImage)
