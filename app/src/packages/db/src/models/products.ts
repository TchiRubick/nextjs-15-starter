import { and, eq, gt, lt, or, SQLWrapper } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { db } from '../..';
import { Product, Schedule } from '../schema';

// ============================================================================
// Schemas
// ============================================================================
export const zInsertProduct = createInsertSchema(Product, {
  name: z.string().min(1, 'Product name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().positive('Price must be greater than 0'),
  status: z.enum(['draft', 'published']).default('draft'),
  area: z.number().int().min(0).default(2),
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

export const getProducts = async () =>
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
  min_price?: number;
  max_price?: number;
  check_in?: string;
  check_out?: string;
};

export const getProductsByFilter = async (filter: ProductFilter) => {
  const { min_price, max_price, check_in, check_out } = filter;

  const filterProduct: SQLWrapper[] = [];
  const filterSchedult: SQLWrapper[] = [gt(Schedule.startDate, new Date())];

  if (min_price) {
    filterProduct.push(gt(Product.price, min_price));
  }

  if (max_price) {
    filterProduct.push(lt(Product.price, max_price));
  }

  if (check_in) {
    filterSchedult.push(gt(Schedule.endDate, new Date(check_in)));
  }

  if (check_out) {
    filterSchedult.push(lt(Schedule.startDate, new Date(check_out)));
  }

  return db.query.Product.findMany({
    where: and(...filterProduct),
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
      schedules: {
        where: and(
          or(eq(Schedule.status, 'validated'), eq(Schedule.status, 'pending')),
          ...filterSchedult
        ),
        orderBy: (schedule, { asc }) => asc(schedule.startDate),
      },
    },
    orderBy: (product, { desc }) => desc(product.price),
  });
};
