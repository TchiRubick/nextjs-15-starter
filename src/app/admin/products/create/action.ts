'use server';

import { createProduct, type InsertProduct } from '@packages/db/models/products';

export const createProductAction = async (data: InsertProduct) => {
  const products = await createProduct(data);
  return products;
};
