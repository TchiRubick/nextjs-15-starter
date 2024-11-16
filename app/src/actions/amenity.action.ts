'use server';

import { isLoggedInAdminOrThrow } from '@packages/auth/index';
import {
  createAmenity,
  deleteAmenity,
  getAmenities,
  InsertAmenity,
} from '@packages/db/models/amenities';

// ============================================================================
// Amenity Actions
// ============================================================================

/**
 * Retrieves all amenities.
 * @returns An array of amenities or an empty array if an error occurs.
 */
export const getAmenitiesQuery = async () => {
  try {
    return await getAmenities();
  } catch (error) {
    console.error(error);
    return [];
  }
};

/**
 * Creates a new amenity.
 * @param data - The data for the new amenity.
 * @returns The created amenity or an error if creation fails.
 */
export const createAmenityAdminMutation = async (data: InsertAmenity) => {
  try {
    await isLoggedInAdminOrThrow();
    const [amenity] = await createAmenity(data);
    return amenity;
  } catch (error) {
    console.error(error);
    return error as unknown as Error;
  }
};

/**
 * Deletes an amenity by ID.
 * @param id - The ID of the amenity to delete.
 * @returns The deleted amenity or an error if deletion fails.
 */
export const deleteAmenityAdminMutation = async (id: number) => {
  try {
    await isLoggedInAdminOrThrow();
    const [amenity] = await deleteAmenity(id);
    return amenity;
  } catch (error) {
    console.error(error);
    return error as unknown as Error;
  }
};
