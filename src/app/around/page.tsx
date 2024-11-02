'use server';

import { NearbyPlaces } from '../_components/nearby-places';
import { Titles } from '../_components/titles';

export default async function AroundPage() {
  return (
    <main className='mt-16 flex flex-col items-center justify-center'>
      <Titles />
      <NearbyPlaces />
    </main>
  );
}
