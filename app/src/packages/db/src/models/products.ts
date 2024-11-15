import { eq } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { db } from '../..';
import { Product } from '../schema';

// ============================================================================
// Schemas
// ============================================================================
export const zInsertProduct = createInsertSchema(Product, {
  name: z.string().min(1, 'Product name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().positive('Price must be greater than 0'),
  status: z.enum(['draft', 'published']).default('draft'),
  bed: z.number().int().min(0).default(0),
  bath: z.number().int().min(0).default(0),
  maxPerson: z.number().int().min(0).default(0),
  room: z.number().int().positive('Room number is required'),
});

export const zSelectProduct = createSelectSchema(Product);

export const zUpdateProduct = zInsertProduct.partial();

// ============================================================================
// Types
// ============================================================================
export type InsertProduct = z.infer<typeof zInsertProduct>;
export type UpdateProduct = z.infer<typeof zUpdateProduct>;
export type ProductSelect = z.infer<typeof zSelectProduct>;

// ============================================================================
// Queries
// ============================================================================
export const getProductById = async (id: number) =>
  db.query.Product.findFirst({
    where: (product, { eq }) => eq(product.id, id),
    with: {
      amenities: {
        with: {
          amenity: true,
        },
      },
      images: {
        with: {
          image: true,
        },
      },
    },
  });

export const getAllProducts = async () =>
  db.query.Product.findMany({
    with: {
      amenities: {
        with: {
          amenity: true,
        },
      },
      images: {
        with: {
          image: true,
        },
      },
    },
    orderBy: (product, { asc }) => asc(product.id),
  });

export const createProduct = async (input: InsertProduct) =>
  db.insert(Product).values(input).returning();

export const updateProduct = async (id: number, input: UpdateProduct) =>
  db.update(Product).set(input).where(eq(Product.id, id)).returning();

type ProductFilter = {
  min_price: number;
  max_price: number;
};

export const getProductByFliter = async (filter: ProductFilter) => {
  const { min_price, max_price } = filter;

  return db.query.Product.findMany({
    where: (product, { gte, lte, and }) =>
      and(
        gte(product.price, min_price) && lte(product.price, max_price),
        eq(product.status, 'published')
      ),
    with: {
      amenities: {
        with: {
          amenity: true,
        },
      },
      images: {
        with: {
          image: true,
        },
      },
    },
  });
};
