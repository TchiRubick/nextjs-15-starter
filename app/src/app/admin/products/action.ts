'use server';

import { env } from '@/env';
import { getImageStorage } from '@/lib/get-image-storage';
import { upload } from '@/packages/s3';
import { createMassImage } from '@packages/db/models/image';
import {
  createMassProductAmenity,
  deleteProductAmenity,
} from '@packages/db/models/product-amenity';
import { createMassProductImage } from '@packages/db/models/product-image';
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

export const uploadProductPicture = async (id: number, files: File[]) => {
  const names: string[] = [];

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();

    const buffer = new Uint8Array(arrayBuffer);

    const safename = file.name.replace(/[^A-Z0-9]+/gi, '_');

    await upload(safename, Buffer.from(buffer));

    names.push(safename);
  }

  const images = await createMassImage(
    names.map((name) => ({ url: name, bucket: env.MINIO_BUCKET_NAME }))
  );

  await createMassProductImage(
    images.map((image) => ({ productId: id, imageId: image.id }))
  );

  return images;
};

export const getImageUrl = async (name: string) => {
  const url = getImageStorage(name);
  return url;
}
