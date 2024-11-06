import { addDays } from 'date-fns';
import { z } from 'zod';

export const paramsValidation = z.object({
  check_in: z
    .string()
    .min(1)
    .optional()
    .default(new Date().toLocaleDateString())
    .transform((v) => new Date(v)),
  check_out: z
    .string()
    .min(1)
    .optional()
    .default(addDays(new Date(), 1).toLocaleDateString())
    .transform((v) => new Date(v)),
  max_price: z.coerce.number().default(20),
  min_price: z.coerce.number().default(10),
});

export const filterParamValidation = z.object({
  min_price: z.coerce.number(),
  max_price: z.coerce.number(),
  check_in: z.string(),
  check_out: z.string(),
});

export type ParamsValidation = z.infer<typeof paramsValidation>;

export type FilterParamValidation = z.infer<typeof filterParamValidation>;

export const defaultParamsValidation: ParamsValidation = {
  check_in: new Date(),
  check_out: addDays(new Date(), 1),
  max_price: 20,
  min_price: 10,
};

export const defaultFilterParamValidation: FilterParamValidation = {
  min_price: 10,
  max_price: 20,
  check_in: new Date().toLocaleDateString(),
  check_out: addDays(new Date(), 1).toLocaleDateString(),
};
