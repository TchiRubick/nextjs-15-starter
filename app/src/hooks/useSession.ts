import { isLoggedIn } from '@/actions/auth.action';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

export const useSession = () => {
  const pathname = usePathname();
  return useQuery({
    queryKey: ['user', 'session', pathname],
    queryFn: () => isLoggedIn(),
  });
};
