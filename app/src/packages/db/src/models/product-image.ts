import { eq } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { db } from '../..';
import { ProductImage } from '../schema';

// ============================================================================
// Schemas
// ============================================================================
export const zInsertProductImage = createInsertSchema(ProductImage, {
  productId: z.number().positive('Product id is required'),
  imageId: z.number().positive('Image id is required'),
});

export const zSelectProductImage = createSelectSchema(ProductImage);

export const zUpdateProductImage = zInsertProductImage.pick({
  productId: true,
  imageId: true,
});

export const productProduct = zInsertProductImage.shape;

// ============================================================================
// Types
// ============================================================================
export type InsertProductImage = z.infer<typeof zInsertProductImage>;
export type UpdateProductImage = z.infer<typeof zUpdateProductImage>;
export type ProductImageSelect = z.infer<typeof zSelectProductImage>;

// ============================================================================
// Queries
// ============================================================================
export const getProductImageById = async (id: number) =>
  db.query.ProductImage.findFirst({
    where: (productImage, { eq }) => eq(productImage.id, id),
  });

export const getProductImageByProductId = async (productId: number) =>
  db.query.ProductImage.findMany({
    where: (productImage, { eq }) => eq(productImage.productId, productId),
  });

export const deleteProductImage = async (id: number) =>
  db.delete(ProductImage).where(eq(ProductImage.productId, id)).returning();

export const createMassProductImage = async (input: InsertProductImage[]) =>
  db.insert(ProductImage).values(input).returning();
