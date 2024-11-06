'use server';

import { useSearchParamState } from '@/hooks/useSearchParamServer';
import { Filter } from './_components/filter';
import { type SearchParams } from 'nuqs/server';
import Link from 'next/link';

import { z } from 'zod';
import { useSearchParamStateGetterServer } from '@/hooks/useTest';

type PageProps = {
  searchParams: Promise<SearchParams>;
};

const CheckInPage = async ({ searchParams }: PageProps) => {
  const params = await searchParams;

  const values = await useSearchParamStateGetterServer(
    params as any,
    z.object({
      from: z
        .string()
        .default('')
        .transform((v) => new Date(v)),
      to: z
        .string()
        .default('')
        .transform((v) => new Date(v)),
      max_price: z.coerce.number().default(10),
      min_price: z.coerce.number().default(20),
    }),
    {
      from: new Date(),
      to: new Date(),
      max_price: 0,
      min_price: 0,
    }
  );

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
              Date de debut : {values.from.toLocaleDateString()} <br />
              Date de fin : {values.to.toLocaleDateString()}
            </h2>
            <p className='mt-2 tracking-wider text-gray-800 dark:text-blue-400'>
              Prix max : {values.max_price} $ <br />
              Prix min : {values.min_price} $
            </p>
          </div>
        </div>
      </Link>
    </main>
  );
};

export default CheckInPage;
