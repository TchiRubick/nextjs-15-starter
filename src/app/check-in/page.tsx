'use server';

import { Filter } from './_components/filter';

import { useSearchParamsServerParser as searchParamsServerParser } from '@/hooks/useSearchParamsServerParser';
import InternalError from '@/lib/error';
import { getAvailability } from '@packages/uplisting';
import Image from 'next/image';
import {
  defaultParamsValidation,
  paramsValidation,
  type ParamsValidation,
} from './_validations';

const CheckInPage = async ({
  searchParams,
}: {
  searchParams: Promise<ParamsValidation>;
}) => {
  const params = await searchParams;

  const values = await searchParamsServerParser(
    params,
    paramsValidation,
    defaultParamsValidation,
    '/check-in'
  );

  const availability = await getAvailability(values);

  return (
    <main className='mt-16 flex min-h-screen flex-col items-center justify-items-start space-y-4'>
      <Filter />
      {(availability instanceof InternalError || availability.length === 0) && (
        <div className='flex flex-col items-center justify-center'>
          <h3 className='py-8 text-2xl font-bold'>
            Aucune disponibilité trouvée
          </h3>
          <Image
            src='/illustration/undraw_empty_re_opql.svg'
            alt='no data'
            width={700}
            height={700}
          />
        </div>
      )}
      {Array.isArray(availability) && availability.length > 0 && (
        <div className='flex flex-col gap-4'>
          {availability.map((item) => (
            <ul key={item.id}>
              <li>name: {item.name}</li>
              <li>description: {item.description}</li>
              <li>capacity: {item.capacity}</li>
              <li>bedrooms: {item.rooms.bedrooms}</li>
              <li>beds: {item.rooms.beds}</li>
              <li>bathrooms: {item.rooms.bathrooms}</li>
              <li>
                address: {item.address.street}, {item.address.city},{' '}
                {item.address.state}, {item.address.zip_code},{' '}
                {item.address.country}
              </li>
              <li>
                amenities:
                <ol>
                  {item.amenities.map((amenity) => (
                    <li key={amenity.group}>
                      {amenity.group}: {amenity.values.join(', ')}
                    </li>
                  ))}
                </ol>
              </li>
              <li>
                photos:
                <ol>
                  {item.photos.map((photo) => (
                    <li key={photo.url}>
                      <Image
                        src={photo.url}
                        alt={photo.created_at}
                        width={100}
                        height={100}
                      />
                    </li>
                  ))}
                </ol>
              </li>
            </ul>
          ))}
        </div>
      )}
    </main>
  );
};

export default CheckInPage;
