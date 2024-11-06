'use server';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { AboutHero } from './_components/about-hero';

const images = ['/e1.jpg', '/e.jpg', '/m.jpg', '/m1.jpg'];

export default async function About() {
  return (
    <main>
      <AboutHero />
      <div>
        <h4 className='font-regular text-center text-2xl tracking-tighter md:text-3xl lg:text-4xl'>
          Les clients confirment que la description et les photos reflètent
          fidèlement la réalité.
        </h4>
        <section className='flex w-full flex-col-reverse items-center justify-center px-4 py-10 lg:py-20 xl:flex-row-reverse'>
          <div className='px-2'>
            <p className='mt-4 max-w-xl text-left text-base leading-relaxed tracking-tight text-muted-foreground'>
              Offrant une vue sur la montagne, ce chalet comprend une terrasse,
              un coin salon, une télévision par satellite à écran plat, une
              cuisine entièrement équipée avec un lave-vaisselle et un
              micro-ondes ainsi qu&apos;une salle de bains privative pourvue
              d&apos;une douche et d&apos;un sèche-cheveux. Un grille-pain, un
              réfrigérateur, des plaques de cuisson, une machine à café et une
              bouilloire sont également fournis. Le linge de lit et les
              serviettes sont fournis.
            </p>
            <p className='mt-4 max-w-xl text-left text-base leading-relaxed tracking-tight text-muted-foreground'>
              En été, vous pourrez utiliser le barbecue et dîner sur le balcon
              privé.
            </p>
            <p className='mt-4 max-w-xl text-left text-base leading-relaxed tracking-tight text-muted-foreground'>
              Un service de location de vélos est assuré sur place pour vous
              permettre de partir à la découverte des environs. Vous pourrez
              pratiquer le ski et le vélo dans les environs. Un service de
              location de matériel de ski, un point de vente de forfaits de ski
              et un local à skis sont également disponibles sur place.
            </p>
            <p className='mt-4 max-w-xl text-left text-base leading-relaxed tracking-tight text-muted-foreground'>
              L&apos;aéroport le plus proche, celui de Mulhouse-Fribourg, est
              situé à 75 km.
            </p>
          </div>
          <div className='flex max-w-full justify-center'>
            <Carousel className='w-[700px]'>
              <CarouselContent>
                {images.map((image) => (
                  <CarouselItem key={image}>
                    <Image
                      src={image}
                      alt='tytyty'
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
