import { CTA } from './_components/cta';
import { FAQ } from './_components/faq';
import { Hero } from './_components/hero';
import { Testimonials } from './_components/testimonials';
import FeaturesPage from '../features/page';
import AroundPage from '../around/page';

export default function Home() {
  return (
    <main className='home-page flex w-full flex-col gap-16'>
      <section className='relative w-full'>
        <Hero />
      </section>

      <section>
        <Testimonials />
      </section>
      <section>
        <FeaturesPage />
      </section>
      <section>
        <AroundPage/>
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
