'use server';

import { redirect } from 'next/navigation';
import queryString from 'query-string';
import { z } from 'zod';

export const useSearchParamsServerParser = async <T extends z.ZodRawShape>(
  params: z.infer<typeof schemas>,
  schemas: z.ZodObject<T>,
  defaultValue: z.infer<typeof schemas>,
  redirectPath = '/'
) => {
  const paramState = () => {
    const result = schemas.safeParse(params);

    if (result.error) {
      const newParams = queryString.stringify(defaultValue);
      redirect(`${redirectPath}?${newParams}`);
    }

    return result.data;
  };

  return paramState();
};
