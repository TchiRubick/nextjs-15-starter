'use server';

import { getAllProducts } from '@packages/db/models/products';
import { getProductById } from '@packages/db/models/products';

export const getAllProductsAction = async () => {
  const products = await getAllProducts();
  return products;
};

export const getOneProductAction = async (id: number) => {
  const product = await getProductById(id);
  return product;
};
