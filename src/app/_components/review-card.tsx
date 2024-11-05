import { Card, CardContent } from '@/components/ui/card';
import { DateTime } from 'luxon';
import { range } from 'radash';

export interface ReviewCardProps {
  name: string;
  message: string;
  rating: 0 | 1 | 2 | 3 | 4 | 5;
  date: string;
}

export const ReviewCard = ({
  name,
  message,
  rating,
  date,
}: ReviewCardProps) => {
  return (
    <Card className='w-full max-w-md overflow-hidden bg-white shadow-lg dark:bg-gray-800'>
      <CardContent className='p-6'>
        <div className='mb-4'>
          <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>
            {name}
          </h3>
        </div>
        <p className='mb-4 text-sm text-gray-600 dark:text-gray-300'>
          &ldquo;{message}&rdquo;
        </p>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            {[...range(1, rating)].map((r) => (
              <svg
                className='mr-1 h-4 w-4 text-yellow-400'
                fill='currentColor'
                viewBox='0 0 20 20'
                key={r}
              >
                <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
              </svg>
            ))}
          </div>
          <span className='text-sm text-gray-500 dark:text-gray-400'>
            {DateTime.fromISO(date).setLocale('fr').toFormat('yyyy LLL dd')}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
