'use server';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Badge } from 'lucide-react';
import Image from 'next/image';

const i1 = ['/e1.jpg', '/e.jpg', '/m.jpg'];
const i2 = ['/m1.jpg', '/465530959.jpg', '/465530248.jpg'];

export default async function About() {
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
                  9,8 pour un séjour à deux
                </h2>
                <p className='max-w-xl text-center text-lg leading-relaxed tracking-tight text-muted-foreground lg:text-left'>
                  Situé à Bussang, à moins de 37 km du lac de Gérardmer et à 46
                  km de la gare de Belfort, le Refuges des Hauts propose un
                  hébergement avec un accès skis aux pieds. Vous bénéficierez
                  gratuitement d&apos;une connexion Wi-Fi et d&apos;un parking
                  privé. Situé à 40 km du lac Longemer, ce chalet dispose
                  d&apos;un casino et d&apos;un jardin. Il propose des chambres
                  familiales et une aire de pique-nique.
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
