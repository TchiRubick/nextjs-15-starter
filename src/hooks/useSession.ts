import { isLoggedIn } from '@/actions/auth';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

export const useSession = () => {
  const pathname = usePathname();

  return useQuery({
    queryKey: ['user', pathname],
    queryFn: () => isLoggedIn(),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    staleTime: 1000 * 60,
  });
};
