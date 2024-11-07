'use server';

import { Amenities } from '../_components/amenities';
import { CTA } from '../_components/cta';
import { FAQ } from '../_components/faq';
import { Hero } from '../_components/hero';
import { Testimonials } from '../_components/testimonials';
import { Filter } from '../check-in/_components/filter';

export default async function Home() {
  return (
    <div className='flex w-full flex-col'>
      {/* Hero Section with Filter */}
      <section className="relative min-h-screen w-full">
        <Hero />

        {/* Floating Filter Card */}
        <div className="absolute left-1/2 bottom-0 w-full max-w-6xl -translate-x-1/2 translate-y-1/2 px-4">
          <Filter />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mt-32">
        <Testimonials />
      </section>

      {/* Content Sections with proper spacing */}
      <section className="mt-32 space-y-24 px-4">
        <Amenities />
        <CTA />
        <FAQ />
      </section>
    </div>
  );
}
