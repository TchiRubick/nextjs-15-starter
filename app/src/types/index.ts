import { InsertProduct } from '@packages/db/models/products';

export type CreateProduct = InsertProduct & {
  amenities: string[];
};

export type EditProduct = InsertProduct & {
  amenities: string[];
};
