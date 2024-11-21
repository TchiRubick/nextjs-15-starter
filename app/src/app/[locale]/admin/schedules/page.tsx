'use server';

import { getSchedulesQuery } from '@/actions/schedule.action';
import getQueryClient from '@/lib/query-client';
import { BookCalendar } from './_components/book-calendar';

export default async function SchedulesPage() {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery({
    queryKey: ['schedules'],
    queryFn: () => getSchedulesQuery(),
  });

  return <BookCalendar />;
}
