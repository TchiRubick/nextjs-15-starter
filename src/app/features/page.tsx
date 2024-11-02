'use server';

import { Features } from '../_components/features';
import { Titles } from '../_components/titles';

export default async function FeaturesPage() {
  return (
    <main className='mt-16 flex flex-col items-center justify-center'>
      <Titles />
      <Features />
    </main>
  );
}
