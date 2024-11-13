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
export const getProductAmenityById = async (id: number) =>
  db.query.ProductAmenity.findFirst({
    where: (productAmenity, { eq }) => eq(productAmenity.id, id),
  });

export const getProductAmenityByProductId = async (productId: number) =>
  db.query.ProductAmenity.findMany({
    where: (productAmenity, { eq }) => eq(productAmenity.productId, productId),
  });

export const getProductAmenityByAmenityId = async (amenityId: number) =>
  db.query.ProductAmenity.findMany({
    where: (productAmenity, { eq }) => eq(productAmenity.amenityId, amenityId),
  });

export const getAllProductAmenities = async () =>
  db.query.ProductAmenity.findMany();

export const createProductAmenity = async (input: InsertProductAmenity) =>
  db.insert(ProductAmenity).values(input).returning();

export const updateProductAmenity = async (
  id: number,
  input: UpdateProductAmenity
) =>
  db
    .update(ProductAmenity)
    .set(input)
    .where(eq(ProductAmenity.id, id))
    .returning();
