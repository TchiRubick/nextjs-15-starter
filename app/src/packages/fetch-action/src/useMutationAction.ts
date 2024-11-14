import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';

type MutationFn<Params extends unknown[], Data = unknown> = (
  ...args: Params
) => Promise<Data>;

type CustomMutationResult<
  Data = unknown,
  Params extends unknown[] = unknown[],
  Context = unknown,
> = Omit<
  UseMutationResult<Data, Error, Params, Context>,
  'mutate' | 'mutateAsync'
> & {
  mutate: (...args: Params) => void;
  mutateAsync: (...args: Params) => Promise<Data>;
};

export function useMutationAction<
  Params extends unknown[],
  Data = unknown,
  Context = unknown,
>(
  fn: MutationFn<Params, Data>,
  options?: Omit<UseMutationOptions<Data, Error, Params, Context>, 'mutationFn'>
): CustomMutationResult<Data, Params, Context> {
  const mutation = useMutation({
    mutationFn: (params: Params) => fn(...params),
    ...options,
  });

  return {
    ...mutation,
    mutate: (...args: Params) => mutation.mutate(args as Params),
    mutateAsync: (...args: Params) => mutation.mutateAsync(args as Params),
  };
}
