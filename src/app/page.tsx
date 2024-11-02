'use server';

import { FAQ } from './_components/faq';

import { Hero } from './_components/hero';
import { Testimonials } from './_components/testimonials';

import { CTA } from './_components/cta';
import { Amenities } from './_components/amenities';

export default async function Home() {
  return (
    <div className='flex w-full flex-col items-center justify-center'>
      <Hero />
      {/* <Description /> */}
      <Testimonials />
      <Amenities />
      <CTA />
      <FAQ />
    </div>
  );
}
