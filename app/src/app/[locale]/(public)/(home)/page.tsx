import { CTA } from './_components/cta';
import { FAQ } from './_components/faq';
import { Features } from './_components/features';
import { Hero } from './_components/hero';
import { NearbyPlaces } from './_components/nearby-places';
import { Testimonials } from './_components/testimonials';

export default function Home() {
  return (
    <main className='home-page flex w-full flex-col gap-16'>
      <section className='relative w-full'>
        <Hero />
      </section>

      <section>
        <Testimonials />
      </section>

      <section className='hidden sm:block'>
        <Features />
      </section>

      <section>
        <NearbyPlaces />
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
