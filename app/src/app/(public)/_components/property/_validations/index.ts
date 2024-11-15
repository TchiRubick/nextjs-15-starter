import { addDays } from 'date-fns';
import { z } from 'zod';

const DEFAULT_TODAY = new Date();
const DEFAULT_TOMORROW = addDays(DEFAULT_TODAY, 1);
const DEFAULT_TODAY_STRING = DEFAULT_TODAY.toISOString().split('T')[0];
const DEFAULT_TOMORROW_STRING = DEFAULT_TOMORROW.toISOString().split('T')[0];

export const paramsValidation = z.object({
  check_in: z
    .string()
    .optional()
    .default(DEFAULT_TODAY_STRING)
    .transform((v) => new Date(v)),
  check_out: z
    .string()
    .optional()
    .default(DEFAULT_TOMORROW_STRING)
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
type FilterParamValidation = z.infer<typeof filterParamValidation>;

export const defaultPropertyParam: ParamsValidation = {
  check_in: DEFAULT_TODAY,
  check_out: DEFAULT_TOMORROW,
  max_price: 100,
  min_price: 30,
};

export const defaultPropertyFilterParam: FilterParamValidation = {
  max_price: 100,
  min_price: 30,
  check_in: DEFAULT_TODAY_STRING,
  check_out: DEFAULT_TOMORROW_STRING,
};
