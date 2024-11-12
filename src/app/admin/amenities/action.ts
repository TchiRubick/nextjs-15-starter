'use server';

import InternalError from '@/lib/error';
import {
  AmenitySelect,
  createAmenity,
  getAllAmenities,
  InsertAmenity,
} from '@packages/db/models/amenities';

export const getAllAmenitiesAction = async () => {
  const amenities = await getAllAmenities();
  return amenities;
};

export const createAmenityAction = async (
  data: InsertAmenity
): Promise<AmenitySelect | InternalError> => {
  try {
    const [amenity] = await createAmenity(data);
    return amenity;
  } catch (error) {
    return new InternalError(error, 'CREATION_FAILED');
  }
};
