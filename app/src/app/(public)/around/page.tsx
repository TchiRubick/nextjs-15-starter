'use server';

import { Titles } from '../_components/titles';
import { NearbyPlaces } from './_components/nearby-places';

export default async function AroundPage() {
  return (
    <main className='mt-16 flex flex-col items-center justify-center'>
      <NearbyPlaces />
    </main>
  );
}
