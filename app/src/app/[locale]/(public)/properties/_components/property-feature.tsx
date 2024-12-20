import { getScopedI18n } from '@/locales/server';
import { Bath, Bed, Home, Users } from 'lucide-react';

interface PropertyFeaturesProps {
  bed: number | null;
  bath: number | null;
  maxPerson: number | null;
  room: number | null;
}

export async function PropertyFeatures({
  bed,
  bath,
  maxPerson,
  room,
}: PropertyFeaturesProps) {
  const tPropertyFeatures = await getScopedI18n('propertyFeatures');

  return (
    <div className='mb-8 grid grid-cols-4 gap-4'>
      <div className='flex flex-col items-center rounded-lg bg-muted p-4'>
        <Bed className='mb-2 h-6 w-6' />
        <span className='text-sm'>
          {bed ?? '-'}{' '}
          <span className='hidden sm:inline'>{tPropertyFeatures('beds')}</span>
        </span>
      </div>
      <div className='flex flex-col items-center rounded-lg bg-muted p-4'>
        <Bath className='mb-2 h-6 w-6' />
        <span className='text-sm'>
          {bath ?? '-'}{' '}
          <span className='hidden sm:inline'>{tPropertyFeatures('baths')}</span>
        </span>
      </div>
      <div className='flex flex-col items-center rounded-lg bg-muted p-4'>
        <Users className='mb-2 h-6 w-6' />
        <span className='text-sm'>
          <span className='sm:hidden'>{maxPerson ?? '-'}</span>
          <span className='hidden sm:inline'>
            {tPropertyFeatures('fits', { count: maxPerson ?? '-' })}
          </span>
        </span>
      </div>
      <div className='flex flex-col items-center rounded-lg bg-muted p-4'>
        <Home className='mb-2 h-6 w-6' />
        <span className='text-sm'>
          {room ?? '-'}{' '}
          <span className='hidden sm:inline'>{tPropertyFeatures('rooms')}</span>
        </span>
      </div>
    </div>
  );
}
