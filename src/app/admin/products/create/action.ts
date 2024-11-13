'use server';

import { getAllAmenities } from '@packages/db/models/amenities';
import {
  createProduct,
  updateProduct,
  type InsertProduct,
} from '@packages/db/models/products';
import { createProductAmenity } from '@packages/db/models/product-amenity';

export const createProductAction = async (
  data: InsertProduct,
  amenityId: number[]
) => {
  const [product] = await createProduct(data);

  await Promise.all(
    amenityId.map(async (id) => {
      await createProductAmenity({ productId: product.id, amenityId: id });
    })
  );
  return product;
};

export const getAmenitiesAction = async () => {
  const amenities = await getAllAmenities();
  return amenities;
};

export const updateProductAction = async (id: number, data: InsertProduct) => {
  const products = await updateProduct(id, data);
  return products;
};
