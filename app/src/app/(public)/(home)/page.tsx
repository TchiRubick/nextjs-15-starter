'use server';

import { searchParamsParser } from '@/lib/searchParamsParser';

import { getFilteredProperties } from '@/actions/product.action';
import {
  defaultPropertyParam,
  paramsValidation,
  ParamsValidation,
} from '../_components/property/_validations';
import { Properties } from '../_components/property/properties';
import { CTA } from './_components/cta';
import { FAQ } from './_components/faq';
import { Hero } from './_components/hero';
import { Testimonials } from './_components/testimonials';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<ParamsValidation>;
}) {
  const params = await searchParams;

  const values = await searchParamsParser(
    params,
    paramsValidation,
    defaultPropertyParam,
    '/check-in'
  );

  const products = await getFilteredProperties(values);

  return (
    <main className='flex w-full flex-col gap-16'>
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
