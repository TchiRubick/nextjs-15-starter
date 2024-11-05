import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Badge } from 'lucide-react';
import Image from 'next/image';

const images = ['/465530959.jpg', '/465530248.jpg'];

export const AboutHero = () => (
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
              Situé à Bussang, à moins de 37 km du lac de Gérardmer et à 46 km
              de la gare de Belfort, le Refuges des Hauts propose un hébergement
              avec un accès skis aux pieds. Vous bénéficierez gratuitement
              d&apos;une connexion Wi-Fi et d&apos;un parking privé. Situé à 40
              km du lac Longemer, ce chalet dispose d&apos;un casino et
              d&apos;un jardin. Il propose des chambres familiales et une aire
              de pique-nique.
            </p>
          </div>
        </div>
        <div className='flex max-w-full justify-center'>
          <Carousel className='w-[700px]'>
            <CarouselContent>
              {images.map((image) => (
                <CarouselItem key={image}>
                  <Image
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
);
