'use server';

import { env } from '@/env';
import { getImageStorage } from '@/lib/get-image-storage';
import { upload } from '@/packages/s3';
import {
  isLoggedInAdminOrThrow,
  isLoggedInOrThrow,
} from '@packages/auth/index';
import { db } from '@packages/db';
import { createMassImage, deleteImageByUrl } from '@packages/db/models/image';
import {
  createMassProductAmenity,
  deleteProductAmenity,
} from '@packages/db/models/product-amenity';
import { createMassProductImage } from '@packages/db/models/product-image';
import {
  createProduct,
  getProductById,
  getProducts,
  getProductsByFilter,
  InsertProduct,
  UpdateProduct,
  updateProduct,
} from '@packages/db/models/products';
import {
  createSchedule,
  getProductAvailability,
} from '@packages/db/models/schedule';
import { z } from 'zod';
// ============================================================================
// Product Retrieval Actions
// ============================================================================

/**
 * Retrieves all products from the database.
 * @returns An array of products or an empty array if an error occurs.
 */
export const getProductsQuery = async () => {
  try {
    return await getProducts();
  } catch (error) {
    console.error(error);
    return [];
  }
};

/**
 * Retrieves a specific product by its ID.
 * @param id - The ID of the product to retrieve.
 * @returns The product object if found, or undefined if not found or an error occurs.
 */
export const getProductQuery = async (id: number) => {
  try {
    return await getProductById(id);
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

/**
 * Retrieves products based on the provided filter criteria.
 * @param search - An object containing filter criteria for the search.
 * @returns An array of products that match the filter criteria or an empty array if an error occurs.
 */
const schemasSearchInput = z.object({
  check_in: z.date(),
  check_out: z.date(),
  min_price: z.number(),
  max_price: z.number(),
});

export const getFilteredPropertiesQuery = async (
  search: z.infer<typeof schemasSearchInput>
) => {
  try {
    const filter = schemasSearchInput.parse(search);
    return await getProductsByFilter(filter);
  } catch (error) {
    console.error(error);
    return [];
  }
};

// ============================================================================
// Product Management Actions
// ============================================================================

/**
 * Updates an existing product by its ID.
 * @param id - The ID of the product to update.
 * @param data - The updated product data, including amenities.
 * @returns The updated product object or an error if the update fails.
 */
export const updateProductAdminMutation = async (
  id: number,
  data: UpdateProduct & { amenities: number[] }
) => {
  try {
    await isLoggedInAdminOrThrow();

    return db.transaction(async () => {
      const [product] = await updateProduct(id, data);
      await deleteProductAmenity(id);

      if (data.amenities.length > 0) {
        await createMassProductAmenity(
          data.amenities.map((amenityId) => ({ productId: id, amenityId }))
        );
      }

      return product;
    });
  } catch (error) {
    console.error(error);
    return error as unknown as Error;
  }
};

/**
 * Creates a new product with the provided data and associated amenities.
 * @param data - The data for the new product.
 * @param amenityIds - An array of amenity IDs to associate with the product.
 * @returns The created product object or an error if the creation fails.
 */
export const createProductAdminMutation = async (
  data: InsertProduct,
  amenityIds: number[]
) => {
  try {
    await isLoggedInAdminOrThrow();

    return db.transaction(async () => {
      const [product] = await createProduct(data);

      if (amenityIds.length > 0) {
        await createMassProductAmenity(
          amenityIds.map((amenityId) => ({ productId: product.id, amenityId }))
        );
      }

      return product;
    });
  } catch (error) {
    console.error(error);
    return error as unknown as Error;
  }
};

// ============================================================================
// Image Upload Actions
// ============================================================================

/**
 * Uploads images for a product and associates them with the product ID.
 * @param id - The ID of the product to associate the images with.
 * @param files - An array of image files to upload.
 * @returns An array of uploaded image objects or an error if the upload fails.
 */
export const uploadProductImageAdminMutation = async (
  id: number,
  files: File[]
) => {
  try {
    await isLoggedInAdminOrThrow();
    const names: string[] = [];

    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        throw new Error(
          `Invalid file type: ${file.type}. Only image files are allowed.`
        );
      }

      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      const safename = `${Date.now()}_${crypto.randomUUID()}`;

      await upload(safename, Buffer.from(buffer));
      names.push(safename);
    }

    return db.transaction(async () => {
      const images = await createMassImage(
        names.map((name) => ({
          url: getImageStorage(name),
          bucket: env.MINIO_BUCKET_NAME,
        }))
      );

      await createMassProductImage(
        images.map((image) => ({ productId: id, imageId: image.id }))
      );

      return images;
    });
  } catch (error) {
    console.error(error);
    return error as unknown as Error;
  }
};

export const deleteImage = async (url: string) => {
  const imageDeleted = await deleteImageByUrl(url);

  return imageDeleted;
};

export const scheduleProductMutation = async (
  id: number,
  start: Date,
  end: Date
) => {
  const { id: userId } = await isLoggedInOrThrow();

  const isValid = await getProductAvailability(id, start, end);

  if (!isValid) {
    throw new Error('Invalid schedule');
  }

  return db.transaction(async () => {
    const product = await getProductById(id);

    if (!product) {
      throw new Error('Product not found');
    }

    const [schedule] = await createSchedule({
      userId,
      productId: product.id,
      startDate: start,
      endDate: end,
    });

    return schedule;
  });
};
