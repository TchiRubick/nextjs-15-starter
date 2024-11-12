import { InsertProduct } from '@packages/db/models/products';

export type CreateProduct = InsertProduct & {
  amenities: number[];
};
