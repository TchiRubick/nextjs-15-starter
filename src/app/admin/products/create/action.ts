'use server';

import { getAllAmenities } from '@packages/db/models/amenities';
import {
  createProduct,
  type InsertProduct,
} from '@packages/db/models/products';
import { createMassProductAmenity } from '@packages/db/models/product-amenity';

export const createProductAction = async (
  data: InsertProduct,
  amenityId: number[]
) => {
  const [product] = await createProduct(data);

  await createMassProductAmenity(amenityId.map((amenityId) => (
    { productId: product.id, amenityId }
  )));
};

export const getAmenitiesAction = async () => {
  const amenities = await getAllAmenities();
  return amenities;
};
