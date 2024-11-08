'use server';

import BlurFade from '@/components/ui/blur-fade';
import { useSearchParamsServerParser as searchParamsServerParser } from '@/hooks/useSearchParamsServerParser';
import { getAvailability } from '@packages/uplisting';
import { Amenities } from '../_components/amenities';
import { CTA } from '../_components/cta';
import { FAQ } from '../_components/faq';
import { Hero } from '../_components/hero';
import { Properties } from '../_components/properties';
import { Testimonials } from '../_components/testimonials';
import {
  defaultParamsValidation,
  paramsValidation,
  ParamsValidation,
} from '../check-in/_validations';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<ParamsValidation>;
}) {
  const params = await searchParams;

  const values = await searchParamsServerParser(
    params,
    paramsValidation,
    defaultParamsValidation,
    '/check-in'
  );

  const availabilities = await getAvailability(values);

  return (
    <main className='flex w-full flex-col gap-20'>
      {/* Hero Section with Filter */}
      <section className='relative w-full'>
        <BlurFade inView>
          <Hero />
        </BlurFade>
      </section>

      {/* Floating Filter Card */}
      <section className='flex justify-center'>
        <BlurFade delay={0.5}>
          <Properties availabilities={availabilities} />
        </BlurFade>
      </section>

      {/* Testimonials Section */}
      <section>
        <BlurFade delay={0.5} inView>
          <Testimonials />
        </BlurFade>
      </section>

      <section>
        <BlurFade delay={0.5} inView>
          <Amenities />
        </BlurFade>
      </section>

      <section>
        <BlurFade delay={0.5} inView>
          <CTA />
        </BlurFade>
      </section>

      <section>
        <BlurFade delay={0.5} inView>
          <FAQ />
        </BlurFade>
      </section>
    </main>
  );
}
