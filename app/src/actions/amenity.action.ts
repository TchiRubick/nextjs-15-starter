'use server';

import InternalError from '@/lib/error';
import {
  AmenitySelect,
  createAmenity,
  deleteAmenity,
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

export const deleteAmenityAction = async (
  id: number
): Promise<AmenitySelect | InternalError> => {
  try {
    const [amenity] = await deleteAmenity(id);
    return amenity;
  } catch (error) {
    return new InternalError(error, 'DELETION_FAILED');
  }
};
