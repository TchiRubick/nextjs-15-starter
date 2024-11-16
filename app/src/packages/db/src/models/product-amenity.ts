import { eq } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { db } from '../..';
import { ProductAmenity } from '../schema';

// ============================================================================
// Schemas
// ============================================================================
export const zInsertProductAmenity = createInsertSchema(ProductAmenity, {
  productId: z.number().positive('Product id is required'),
  amenityId: z.number().positive('Amenity id is required'),
});

export const zSelectProductAmenity = createSelectSchema(ProductAmenity);

export const zUpdateProductAmenity = zInsertProductAmenity.pick({
  productId: true,
  amenityId: true,
});

export const productAmenities = zInsertProductAmenity.shape;

// ============================================================================
// Types
// ============================================================================
export type InsertProductAmenity = z.infer<typeof zInsertProductAmenity>;
export type UpdateProductAmenity = z.infer<typeof zUpdateProductAmenity>;
export type ProductAmenitySelect = z.infer<typeof zSelectProductAmenity>;

// ============================================================================
// Queries
// ============================================================================
export const deleteProductAmenity = async (id: number) =>
  db.delete(ProductAmenity).where(eq(ProductAmenity.productId, id)).returning();

export const createMassProductAmenity = async (input: InsertProductAmenity[]) =>
  db.insert(ProductAmenity).values(input).returning();
