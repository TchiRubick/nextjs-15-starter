import { getProductByFliter } from '@packages/db/models/products';

import { z } from 'zod';

const schemasSearchInput = z.object({
  check_in: z.date(),
  check_out: z.date(),
  min_price: z.number(),
  max_price: z.number(),
});

export const getFilteredProperties = async (
  search: z.infer<typeof schemasSearchInput>
) => {
  const filter = schemasSearchInput.parse(search);

  const products = await getProductByFliter(filter);

  return products;
};
