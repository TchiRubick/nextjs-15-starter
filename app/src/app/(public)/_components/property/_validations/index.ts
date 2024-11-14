import { addDays } from 'date-fns';
import { z } from 'zod';

export const paramsValidation = z.object({
  check_in: z
    .string()
    .optional()
    .default(new Date().toISOString().split('T')[0])
    .transform((v) => new Date(v)),
  check_out: z
    .string()
    .optional()
    .default(addDays(new Date(), 1).toISOString().split('T')[0])
    .transform((v) => new Date(v)),
  max_price: z.coerce.number().default(100),
  min_price: z.coerce.number().default(30),
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
  max_price: 100,
  min_price: 30,
};

export const defaultFilterParamValidation: FilterParamValidation = {
  max_price: 100,
  min_price: 30,
  check_in: new Date().toISOString().split('T')[0],
  check_out: addDays(new Date(), 1).toISOString().split('T')[0],
};
