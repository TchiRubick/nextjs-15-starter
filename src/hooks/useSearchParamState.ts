import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import qs from 'querystring';
import { useMemo } from 'react';
import type { z } from 'zod';

export const useSearchParamState = <T extends z.ZodRawShape>(
  schemas: z.ZodObject<T>,
  defaultValue: z.infer<typeof schemas>
) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const paramState = useMemo(() => {
    const result = schemas.safeParse(qs.parse(searchParams.toString()));

    if (result.error) return defaultValue;

    return result.data;
  }, [searchParams, defaultValue, schemas]);

  const setParamState = (newParamState: z.infer<typeof schemas>) => {
    const newParams = qs.stringify(newParamState);

    router.push(`${pathname}?${newParams}`, {
      scroll: false,
    });
  };

  return [paramState, setParamState] as [
    z.infer<typeof schemas>,
    (newParamState: z.infer<typeof schemas>) => void,
  ];
};
