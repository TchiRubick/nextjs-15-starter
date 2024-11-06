'use server';

import { useSearchParamState } from '@/hooks/useSearchParamServer';
import { Filter } from './_components/filter';
import { type SearchParams } from 'nuqs/server';

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
    <main className='mt-16 flex min-h-screen flex-col items-center justify-center'>
      <Filter />
      <p>Date de debut : {values.from.toLocaleDateString()}</p>
      <p>Date de fin : {values.to.toLocaleDateString()}</p>
      <p>Prix max : {values.max_price}</p>
      <p>Prix min : {values.min_price}</p>
    </main>
  );
};

export default CheckInPage;
