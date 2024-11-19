import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import { db } from '../..';
import { ProductImage } from '../schema';
import { eq } from 'drizzle-orm';

// ============================================================================
// Schemas
// ============================================================================
export const zInsertProductImage = createInsertSchema(ProductImage, {
  productId: z.number().positive('Product id is required'),
  imageId: z.number().positive('Image id is required'),
});

// ============================================================================
// Types
// ============================================================================
export type InsertProductImage = z.infer<typeof zInsertProductImage>;

// ============================================================================
// Queries
// ============================================================================

export const createMassProductImage = async (input: InsertProductImage[]) =>
  db.insert(ProductImage).values(input).returning();

export const deleteProductImages = async (imageId: number) => {
  db.delete(ProductImage).where(eq(ProductImage.imageId, imageId)).returning();
};
