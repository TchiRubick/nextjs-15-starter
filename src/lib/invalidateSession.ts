import getQueryClient from './query-client';

export const invalidateSession = async () => {
  const queryClient = getQueryClient();

  await queryClient.invalidateQueries({
    queryKey: ['user', 'session'],
    type: 'all',
    exact: false,
    refetchType: 'all',
  });
};
