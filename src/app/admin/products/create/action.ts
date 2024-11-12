'use server';

import { getAllAmenities } from '@packages/db/models/amenities';
import {
  createProduct,
  type InsertProduct,
} from '@packages/db/models/products';

export const createProductAction = async (data: InsertProduct) => {
  const products = await createProduct(data);
  return products;
};

export const getAmenitiesAction = async () => {
  const amenities = await getAllAmenities();
  return amenities;
};
