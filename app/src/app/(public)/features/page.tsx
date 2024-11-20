'use server';

import { Features } from './_components/features';

export default async function FeaturesPage() {
  return (
    <main className='mt-16 flex flex-col items-center justify-center'>
      <Features />
    </main>
  );
}
