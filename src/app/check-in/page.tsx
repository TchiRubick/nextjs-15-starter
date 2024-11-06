'use server';

import Link from 'next/link';
import { Filter } from './_components/filter';

import { useSearchParamStateGetterServer } from '@/hooks/useTest';
import InternalError from '@/lib/error';
import { getAvailability } from '@packages/uplisting';
import Image from 'next/image';
import { z } from 'zod';

const paramsValidation = z.object({
  check_in: z
    .string()
    .default('')
    .transform((v) => new Date(v)),
  check_out: z
    .string()
    .default('')
    .transform((v) => new Date(v)),
  max_price: z.coerce.number().default(10),
  min_price: z.coerce.number().default(20),
});

const CheckInPage = async ({
  searchParams,
}: {
  searchParams: Promise<z.infer<typeof paramsValidation>>;
}) => {
  const params = await searchParams;

  const values = await useSearchParamStateGetterServer(
    params,
    paramsValidation,
    {
      check_in: new Date(),
      check_out: new Date(),
      max_price: 0,
      min_price: 0,
    }
  );

  const availability = await getAvailability(values);

  if (availability instanceof InternalError) {
    console.error('DEV_ERROR', availability.message);
    return <div>Error: {availability.message}</div>;
  }

  return (
    <main className='mt-16 flex min-h-screen flex-col items-center justify-items-start space-y-4'>
      <Filter />
      <Link href='/#'>
        <div
          className='flex h-96 w-64 items-end overflow-hidden rounded-lg bg-cover shadow-lg hover:scale-95 hover:transition hover:duration-300 hover:ease-in-out'
          style={{ backgroundImage: `url('/276236512.jpg')` }}
        >
          <div className='w-full scale-100 rounded-b-lg bg-white/80 px-3 py-2 backdrop-blur-sm transition duration-300 ease-in-out dark:bg-gray-800/60'>
            <h2 className='mt-4 text-gray-800 dark:text-white'>
              Date de debut : {values.check_in.toLocaleDateString()} <br />
              Date de fin : {values.check_out.toLocaleDateString()}
            </h2>
            <p className='mt-2 tracking-wider text-gray-800 dark:text-blue-400'>
              Prix max : {values.max_price} $ <br />
              Prix min : {values.min_price} $
            </p>
          </div>
        </div>
      </Link>
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
    </main>
  );
};

export default CheckInPage;
