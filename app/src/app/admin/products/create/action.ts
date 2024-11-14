'use server';

import { getAllAmenities } from '@packages/db/models/amenities';
import { createMassProductAmenity } from '@packages/db/models/product-amenity';
import {
  createProduct,
  type InsertProduct,
} from '@packages/db/models/products';

export const createProductAction = async (
  data: InsertProduct,
  amenityIds: number[]
) => {
  const [product] = await createProduct(data);

  if (amenityIds.length > 0) {
    await createMassProductAmenity(
      amenityIds.map((amenityId) => ({ productId: product.id, amenityId }))
    );
  }

  return product;
};

export const getAmenitiesAction = async () => {
  const amenities = await getAllAmenities();
  return amenities;
};
