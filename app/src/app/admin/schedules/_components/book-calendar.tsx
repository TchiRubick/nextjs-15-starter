'use client';

import {
  getSchedulesQuery,
  updateScheduleStatusMutation,
} from '@/actions/schedule.action';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { ScheduleStatus } from '@packages/db/models/schedule';
import { useMutationAction } from '@packages/fetch-action/index';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { useState } from 'react';
import { DayCell } from './day-cell';

const colors: Record<ScheduleStatus, string> = {
  pending: 'bg-yellow-200 hover:bg-yellow-300',
  refused: 'bg-red-200 hover:bg-red-300',
  validated: 'bg-green-200 hover:bg-green-300',
};

export const BookCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedAvailability, setSelectedAvailability] = useState<
    Awaited<ReturnType<typeof getSchedulesQuery>>[number] | null
  >(null);
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ['schedules'],
    queryFn: getSchedulesQuery,
  });

  const { mutateAsync: updateScheduleStatus } = useMutationAction(
    updateScheduleStatusMutation,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['schedules'],
        });

        toast({
          title: 'Succès',
          description: 'Le statut de la réservation a été mis à jour',
        });

        setSelectedAvailability(null);
      },
    }
  );

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentDate(newDate);
  };

  const getStartOfWeek = (date: Date) => {
    const newDate = new Date(date);
    const day = newDate.getDay();
    newDate.setDate(newDate.getDate() - day);
    return newDate;
  };

  const formatDate = (date: Date) => {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const formatDayName = (date: Date) => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    let day = date.getDay();
    day = day === 0 ? 6 : day - 1;
    return days[day];
  };
  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const getAvailabilitiesForDay = (day: Date) => {
    return (data ?? [])
      .map((schedule) => {
        const isStartDay = isSameDay(schedule.startDate, day);
        const isEndDay = schedule.endDate && isSameDay(schedule.endDate, day);
        const isBetweenDays =
          day >= schedule.startDate &&
          (!schedule.endDate || day <= schedule.endDate);

        return {
          data: schedule,
          color: colors[schedule.status],
          morning: (isBetweenDays && !isStartDay) || isEndDay,
          afternoon: (isBetweenDays && !isEndDay) || isStartDay,
        };
      })
      .filter((a) => a.morning || a.afternoon);
  };

  const generateWeekDays = () => {
    const weekStart = getStartOfWeek(currentDate);
    const days = [];

    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + i);
      days.push(day);
    }

    return days;
  };

  const handleStatusChange = async (id: number, status: ScheduleStatus) => {
    await updateScheduleStatus(id, status);
  };

  return (
    <>
      <Card className='w-full max-w-4xl'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-4'>
          <CardTitle>
            Week of {formatDate(getStartOfWeek(currentDate))}
          </CardTitle>
          <div className='flex items-center space-x-2'>
            <Button
              variant='outline'
              size='icon'
              onClick={() => navigateWeek('prev')}
            >
              <ChevronLeft className='h-4 w-4' />
            </Button>
            <Button
              variant='outline'
              size='icon'
              onClick={() => navigateWeek('next')}
            >
              <ChevronRight className='h-4 w-4' />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-7 gap-2'>
            {generateWeekDays().map((day) => (
              <div key={day.toISOString()} className='rounded-lg border'>
                <div className='border-b bg-gray-50 p-2 text-center'>
                  <div className='font-semibold'>{formatDayName(day)}</div>
                  <div className='text-sm text-gray-500'>{day.getDate()}</div>
                </div>
                <DayCell
                  availabilities={getAvailabilitiesForDay(day)}
                  setSelectedAvailability={setSelectedAvailability}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      {selectedAvailability && (
        <Dialog
          open={!!selectedAvailability}
          onOpenChange={() => setSelectedAvailability(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle className='flex items-center gap-2'>
                <span
                  className={`h-3 w-3 rounded-full ${colors[selectedAvailability.status]}`}
                ></span>
                Reservation de {selectedAvailability.user.username} pour{' '}
                {selectedAvailability.product.name}
              </DialogTitle>
            </DialogHeader>
            <div className='space-y-4'>
              <div className='space-y-2'>
                <div className='flex items-center gap-2 text-gray-600'>
                  <Clock className='h-4 w-4' />
                  <span className='font-medium'>Start:</span>
                  <span>{formatDate(selectedAvailability.startDate)}</span>
                </div>
                <div className='flex items-center gap-2 text-gray-600'>
                  <Clock className='h-4 w-4' />
                  <span className='font-medium'>End:</span>
                  <span>{formatDate(selectedAvailability.endDate)}</span>
                </div>
              </div>
              <div className='border-t pt-2'>
                <h5>Contact info:</h5>
                <p className='text-sm text-gray-600'>
                  {selectedAvailability.user.email}
                </p>
              </div>
              <div className='border-t pt-2'>
                <h5>Validation:</h5>
                <Button
                  onClick={() =>
                    handleStatusChange(selectedAvailability.id, 'validated')
                  }
                >
                  Approuver
                </Button>
                <Button
                  onClick={() =>
                    handleStatusChange(selectedAvailability.id, 'refused')
                  }
                >
                  Refuser
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
