'use server';

import { z } from 'zod';

export const useSearchParamStateGetterServer = async <T extends z.ZodRawShape>(
  params: z.infer<typeof schemas>,
  schemas: z.ZodObject<T>,
  defaultValue: z.infer<typeof schemas>
) => {
  const paramState = () => {
    const result = schemas.safeParse(params);

    if (result.error) return defaultValue;

    return result.data;
  };

  return paramState();
};
