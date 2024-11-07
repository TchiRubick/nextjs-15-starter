'use server';

import { FAQ } from '../_components/faq';

import { Hero } from '../_components/hero';
import { Testimonials } from '../_components/testimonials';

import { Amenities } from '../_components/amenities';
import { CTA } from '../_components/cta';
import { Filter } from '../check-in/_components/filter';

export default async function Home() {
  return (
    <div className='flex w-full flex-col items-center justify-center'>
      <Hero />
      <div>
        <h2 className='text-center text-3xl font-bold'>
          Filtrer vos recherches
        </h2>
        <Filter />
      </div>
      <Testimonials />
      <Amenities />
      <CTA />
      <FAQ />
    </div>
  );
}
