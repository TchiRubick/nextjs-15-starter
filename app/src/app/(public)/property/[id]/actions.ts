import { getProductById } from '@packages/db/models/products';

export const getPropertyById = async (id: number) => {
  const product = await getProductById(id);

  return product;
};
