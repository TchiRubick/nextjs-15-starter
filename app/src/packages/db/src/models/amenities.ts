import { eq } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { db } from '../..';
import { Amenity } from '../schema';

// ============================================================================
// Schemas
// ============================================================================
export const zInsertAmenity = createInsertSchema(Amenity, {
  name: z.string().min(1),
});

export const zSelectAmenity = createSelectSchema(Amenity);

export const zUpdateAmenity = zInsertAmenity.pick({
  name: true,
});

export const amenities = zInsertAmenity.shape;

// ============================================================================
// Types
// ============================================================================
export type InsertAmenity = z.infer<typeof zInsertAmenity>;
export type UpdateAmenity = z.infer<typeof zUpdateAmenity>;
export type AmenitySelect = z.infer<typeof zSelectAmenity>;

// ============================================================================
// Queries
// ============================================================================
export const getAllAmenities = async () => db.query.Amenity.findMany();

export const createAmenity = async (input: InsertAmenity) =>
  db.insert(Amenity).values(input).returning();

export const deleteAmenity = async (id: number) =>
  db.delete(Amenity).where(eq(Amenity.id, id)).returning();
