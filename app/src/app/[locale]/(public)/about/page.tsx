'use server';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { getScopedI18n } from '@/locales/server';
import { Badge } from 'lucide-react';
import Image from 'next/image';

const i1 = ['/e1.jpg', '/e.jpg', '/m.jpg'];
const i2 = ['/m1.jpg', '/465530959.jpg', '/465530248.jpg'];

export default async function About() {
  const tAbout = await getScopedI18n('about');

  return (
    <main>
      <div className='w-full py-20 lg:py-40'>
        <div className='container mx-auto'>
          <div className='grid grid-cols-1 items-end justify-end gap-10 xl:grid-cols-2'>
            <div className='flex flex-col items-center gap-4 px-2 xl:items-start'>
              <div>
                <Badge>Platform</Badge>
              </div>
              <div className='flex flex-col gap-2'>
                <h2 className='font-regular text-center text-xl tracking-tighter md:text-3xl lg:max-w-xl lg:text-5xl xl:text-left'>
                  {tAbout('title')}
                </h2>
                <p className='max-w-xl text-center text-lg leading-relaxed tracking-tight text-muted-foreground lg:text-left'>
                  {tAbout('description')}
                </p>
              </div>
            </div>
            <div className='flex max-w-full justify-center'>
              <Carousel className='w-[700px]'>
                <CarouselContent>
                  {i1.map((image) => (
                    <CarouselItem key={image}>
                      <Image
                        objectFit='cover'
                        className='flex aspect-video items-center justify-center rounded-md bg-muted p-6'
                        src={image}
                        alt='sr'
                        width={1000}
                        height={900}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className='absolute left-7' />
                <CarouselNext className='absolute right-7' />
              </Carousel>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h4 className='font-regular text-center text-2xl tracking-tighter md:text-3xl lg:text-4xl'>
          {tAbout('clientConfirmation')}
        </h4>
        <section className='flex w-full flex-col-reverse items-center justify-center px-4 py-10 lg:py-20 xl:flex-row-reverse'>
          <div className='px-2'>
            <p className='mt-4 max-w-xl text-left text-base leading-relaxed tracking-tight text-muted-foreground'>
              {tAbout('features.view')}
            </p>
            <p className='mt-4 max-w-xl text-left text-base leading-relaxed tracking-tight text-muted-foreground'>
              {tAbout('features.summerUsage')}
            </p>
            <p className='mt-4 max-w-xl text-left text-base leading-relaxed tracking-tight text-muted-foreground'>
              {tAbout('features.bikeRental')}
            </p>
            <p className='mt-4 max-w-xl text-left text-base leading-relaxed tracking-tight text-muted-foreground'>
              {tAbout('features.nearestAirport')}
            </p>
          </div>
          <div className='flex max-w-full justify-center'>
            <Carousel className='w-[700px]'>
              <CarouselContent>
                {i2.map((image) => (
                  <CarouselItem key={image}>
                    <Image
                      objectFit='cover'
                      src={image}
                      alt={image}
                      className='flex aspect-video items-center justify-center rounded-md bg-muted p-6'
                      width={1000}
                      height={900}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className='absolute left-7' />
              <CarouselNext className='absolute right-7' />
            </Carousel>
          </div>
        </section>
      </div>
    </main>
  );
}
