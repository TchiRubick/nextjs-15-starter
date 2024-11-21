import { getSchedulesQuery } from '@/actions/schedule.action';

export const DayCell = ({
  availabilities,
  setSelectedAvailability,
}: {
  availabilities: {
    data: Awaited<ReturnType<typeof getSchedulesQuery>>[number];
    color: string;
    morning: boolean;
    afternoon: boolean;
  }[];
  setSelectedAvailability: (
    d: Awaited<ReturnType<typeof getSchedulesQuery>>[number]
  ) => void;
}) => (
  <div className='grid h-64 grid-rows-2'>
    <div className='relative border-b p-2'>
      {availabilities
        .filter((a) => a.morning)
        .map((avail) => (
          <div
            key={avail.data.id}
            className={`${avail.color} my-1 cursor-pointer truncate rounded px-1 text-xs`}
            onClick={() => setSelectedAvailability(avail.data)}
          >
            {avail.data.product.name} - #{avail.data.id}
          </div>
        ))}
    </div>
    <div className='relative p-2'>
      {availabilities
        .filter((a) => a.afternoon)
        .map((avail) => (
          <div
            key={avail.data.id}
            className={`${avail.color} my-1 cursor-pointer truncate rounded px-1 text-xs`}
            onClick={() => setSelectedAvailability(avail.data)}
          >
            {avail.data.product.name} - #{avail.data.id}
          </div>
        ))}
    </div>
  </div>
);
