'use server';

import { getFilteredPropertiesQuery } from '@/actions/product.action';
import {
  defaultPropertyParam,
  paramsValidation,
} from '../_components/property/_validations';
import { Properties } from '../_components/property/properties';
import { CTA } from './_components/cta';
import { FAQ } from './_components/faq';
import { Hero } from './_components/hero';
import { Testimonials } from './_components/testimonials';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<unknown>;
}) {
  const params = await searchParams;

  const { data } = paramsValidation.safeParse(params);

  const products = await getFilteredPropertiesQuery(
    data ?? defaultPropertyParam
  );

  return (
    <main className='home-page flex w-full flex-col gap-16'>
      {/* Hero Section with Filter */}
      <section className='relative w-full'>
        <Hero />
        <Testimonials />
      </section>

      <section></section>

      {/* Floating Filter Card */}
      <section className='flex justify-center' id='properties'>
        <Properties products={products} />
      </section>

      <section>
        <CTA />
      </section>

      <section>
        <FAQ />
      </section>
    </main>
  );
}
