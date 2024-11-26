'use client';

import { getScheduleByUserIdQuery } from '@/actions/schedule.action';
import { SCHEDULES_QUERY_KEY } from '@/app/[locale]/admin/schedules/static';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useSession } from '@/hooks/useSession';
import { useScopedI18n } from '@/locales/client';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { MoveRight, X } from 'lucide-react';
import Link from 'next/link';
import { useMutationAction } from '@packages/fetch-action/index';
import { deleteScheduleByUserIdMutation } from '@/actions/schedule.action';

export const ReservationRecap = () => {
  const tReservationRecap = useScopedI18n('reservationRecap');
  const { data } = useSession();
  const userId = data?.id as string;
  const { data: schedules } = useQuery({
    queryKey: [SCHEDULES_QUERY_KEY, userId],
    queryFn: async () => await getScheduleByUserIdQuery(userId),
  });
  const { mutateAsync } = useMutationAction(deleteScheduleByUserIdMutation);

  const handleDeleteSchedule = async (scheduleId: number) => {
    await mutateAsync(scheduleId);
    window.location.reload();
  };

  return (
    <div className='flex flex-col gap-2'>
      {schedules && schedules.length > 0 ? (
        <div className='flex flex-col gap-2'>
          {schedules?.map((schedule) => (
            <div key={schedule.id} className='flex justify-between gap-2 pr-4'>
              <div className='w-full'>
                <TooltipProvider>
                  <Tooltip>
                    <Label className='mr-1 text-muted-foreground'>
                      {tReservationRecap('reservationNumber')}:
                    </Label>
                    <TooltipTrigger asChild>
                      <Badge
                        className={`${
                          schedule.status === 'pending'
                            ? 'bg-yellow-500'
                            : schedule.status === 'validated'
                              ? 'bg-green-500'
                              : 'bg-red-500'
                        } mt-2 h-4 w-4 animate-pulse cursor-pointer items-center rounded-full p-1`}
                      >
                        {schedule.id}
                      </Badge>
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
                        ? tReservationRecap('pending')
                        : schedule.status === 'validated'
                          ? tReservationRecap('validated')
                          : tReservationRecap('canceled')}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <p className='text-muted-foreground'>
                  {tReservationRecap('startDate')}
                  <Label className='ml-1 font-bold text-primary'>
                    {format(schedule.startDate, 'd MMM, yyyy')}
                  </Label>
                </p>
                <p className='mt-2 text-muted-foreground'>
                  {tReservationRecap('endDate')}
                  <Label className='ml-1 font-bold text-primary'>
                    {format(schedule.endDate, 'd MMM, yyyy')}
                  </Label>
                </p>
                <Separator />
              </div>
              <X
                className='flex h-4 w-4 cursor-pointer items-center justify-center text-muted-foreground'
                onClick={() => handleDeleteSchedule(schedule.id)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col gap-2'>
            <Label className='text-center'>
              {tReservationRecap('noReservations')}
            </Label>
            <div className='flex justify-center'>
              <Link href='/properties' prefetch>
                <Button className='group w-full bg-primary text-white transition-all hover:bg-emerald-700 sm:h-14 sm:w-72'>
                  <span className='text-xl'>
                    {tReservationRecap('bookNow')}
                  </span>
                  <MoveRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
