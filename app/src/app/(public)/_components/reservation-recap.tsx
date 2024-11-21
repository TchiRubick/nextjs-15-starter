'use client';

import { Separator } from '@/components/ui/separator';
import { useQuery } from '@tanstack/react-query';
import { getScheduleByUserIdQuery } from '@/actions/schedule.action';
import { SCHEDULES_QUERY_KEY } from '@/app/admin/schedules/static';
import { useSession } from '@/hooks/useSession';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MoveRight } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export const ReservationRecap = () => {
  const { data } = useSession();
  const userId = data?.id as string;
  const { data: schedules } = useQuery({
    queryKey: [SCHEDULES_QUERY_KEY, userId],
    queryFn: async () => await getScheduleByUserIdQuery(userId),
  });

  return (
    <div className='flex flex-col gap-2'>
      {schedules && schedules.length > 0 ? (
        <div className='flex flex-col gap-2'>
          {schedules?.map((schedule) => (
            <div key={schedule.id}>
              <div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge
                        className={`${
                          schedule.status === 'pending'
                            ? 'bg-yellow-500'
                            : schedule.status === 'validated'
                              ? 'bg-green-500'
                              : 'bg-red-500'
                        } mt-2 h-4 w-4 cursor-pointer rounded-full p-1`}
                      ></Badge>
                    </TooltipTrigger>
                    <TooltipContent
                      className={`${
                        schedule.status === 'pending'
                          ? 'bg-yellow-500'
                          : schedule.status === 'validated'
                            ? 'bg-green-500'
                            : 'bg-red-500'
                      }`}
                    >
                      {schedule.status === 'pending'
                        ? 'En attente'
                        : schedule.status === 'validated'
                          ? 'Validée'
                          : 'Annulée'}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <p className='text-muted-foreground'>
                  Debuter le{' '}
                  <Label className='font-bold text-primary'>
                    {schedule.startDate.toLocaleString()}
                  </Label>
                </p>
                <p className='mt-2 text-muted-foreground'>
                  Terminer le{' '}
                  <Label className='font-bold text-primary'>
                    {schedule.endDate.toLocaleString()}
                  </Label>
                </p>
              </div>
              <Separator />
            </div>
          ))}
        </div>
      ) : (
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col gap-2'>
            <Label className='text-center'>
              Vous n&apos;avez pas encore de réservations
            </Label>
            <Link href='/properties' prefetch>
              <Button className='group w-full bg-primary text-white transition-all hover:bg-emerald-700 sm:h-14 sm:w-72'>
                <span className='text-xl'>Réserver maintenant</span>
                <MoveRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
