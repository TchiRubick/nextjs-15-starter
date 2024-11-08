'use server';

import BlurFade from '@/components/ui/blur-fade';
import { searchParamsParser } from '@/lib/searchParamsParser';
import { getAvailability } from '@packages/uplisting';
import {
  defaultParamsValidation,
  paramsValidation,
  ParamsValidation,
} from '../_components/property/_validations';
import { Properties } from '../_components/property/properties';
import { CTA } from './_components/cta';
import { FAQ } from './_components/faq';
import { Features } from './_components/features';
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

      <section>
        <BlurFade delay={0.5} inView>
          <Testimonials />
        </BlurFade>
      </section>

      {/* Floating Filter Card */}
      <section className='flex justify-center' id='properties'>
        <BlurFade delay={0.5} inView>
          <Properties availabilities={availabilities} />
        </BlurFade>
      </section>

      <section>
        <BlurFade delay={0.5} inView>
          <CTA />
        </BlurFade>
      </section>

      {/* Testimonials Section */}

      <section>
        <BlurFade delay={0.5} inView>
          <Features />
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
