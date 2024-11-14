'use server';

import {
  createMassProductAmenity,
  deleteProductAmenity,
} from '@packages/db/models/product-amenity';
import {
  getAllProducts,
  getProductById,
  UpdateProduct,
  updateProduct,
} from '@packages/db/models/products';

export const getAllProductsAction = async () => {
  const products = await getAllProducts();
  return products;
};

export const getOneProductAction = async (id: number) => {
  const product = await getProductById(id);
  return product;
};

export const updateProductAction = async (
  id: number,
  data: UpdateProduct & { amenities: number[] }
) => {
  const [product] = await updateProduct(id, data);

  await deleteProductAmenity(id);

  if (data.amenities.length > 0) {
    await createMassProductAmenity(
      data.amenities.map((amenityId) => ({ productId: id, amenityId }))
    );
  }

  return product;
};
