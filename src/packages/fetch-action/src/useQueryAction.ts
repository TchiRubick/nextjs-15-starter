import { useQuery, UseQueryResult } from '@tanstack/react-query';

type QueryFunction<Params extends unknown[], Result> = (
  ...params: Params
) => Promise<Result>;

export const useQueryAction = <Params extends unknown[], Result>(
  fn: QueryFunction<Params, Result>,
  ...params: Params
): UseQueryResult<Result, Error> => {
  const newParams = params.map((param) => {
    if (typeof param === 'object') {
      return JSON.stringify(param);
    }

    return param;
  });

  return useQuery({
    queryKey: [fn.name, ...params, ...newParams],
    queryFn: () => fn(...params),
  });
};
