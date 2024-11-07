import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Check } from 'lucide-react';
import Image from 'next/image';

const amenities = [
  'Parking Gratuit',
  'Chambres non-fumeurs',
  'Connexion Wi-Fi rapide gratuite (195 Mb/s)',
  'Chambres familiales',
  'Équipements en chambre',
  'Vue sur la montagne',
  "Services d'affaires",
  'Sécurité',
  'Location de vélos',
];

const images = [
  '/amenities/310428160.jpg',
  '/amenities/310428287.jpg',
  '/amenities/606647110.jpg',
];

export const Amenities = () => (
  <div className='w-full py-20 lg:py-40'>
    <div className='container mx-auto'>
      <div className='container grid grid-cols-1 items-center gap-8 rounded-lg px-5 py-8 lg:grid-cols-2 xl:border'>
        <div className='flex flex-col gap-10'>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
              <h2 className='font-regular max-w-xl text-left text-3xl tracking-tighter lg:text-5xl'>
                Équipements et services
              </h2>
              <p className='max-w-xl text-left text-lg leading-relaxed tracking-tight text-muted-foreground'>
                Pour votre bien etre
              </p>
            </div>
          </div>
          <div className='grid grid-cols-1 items-start gap-6 sm:grid-cols-3 lg:grid-cols-1 lg:pl-6'>
            {amenities.map((amenity) => (
              <div
                className='flex w-full flex-row items-start gap-6'
                key={amenity}
              >
                <Check className='mt-2 h-4 w-4 text-primary' />
                <div className='flex flex-col gap-1'>
                  <p>{amenity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='aspect-square rounded-md bg-muted'>
          <Carousel>
            <CarouselContent>
              {images.map((image) => (
                <CarouselItem key={image}>
                  <Image
                    className='flex aspect-square items-center justify-center rounded-md bg-muted p-6'
                    src={image}
                    alt='amenities'
                    width={700}
                    height={900}
                    objectFit='cover'
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
