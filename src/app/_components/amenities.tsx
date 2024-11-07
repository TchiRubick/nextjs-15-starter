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
  <div className='w-full bg-white'>
    <div className='container mx-auto'>
      <div className='grid grid-cols-1 items-start gap-24 rounded-[2rem] bg-neutral-50 p-12 lg:grid-cols-2'>
        {/* Left Column */}
        <div>
          <h2 className='text-[2.75rem] font-normal leading-[1.2] tracking-tight text-neutral-900'>
            Équipements et services
          </h2>
          <p className='mt-2 text-lg text-neutral-500'>
            Pour votre bien être
          </p>

          <div className='mt-12 grid gap-4'>
            {amenities.map((amenity) => (
              <div
                key={amenity}
                className='flex items-center gap-3'
              >
                <Check className='h-5 w-5 stroke-[1.5px]' />
                <span className='text-[15px] text-neutral-600'>{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className='relative aspect-[4/3] overflow-hidden rounded-[1.5rem]'>
          <Carousel className='h-full'>
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <Image
                    src={image}
                    alt={`Amenity image ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className='object-cover'
                    priority={index === 0}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <button className='absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm'>
              <CarouselPrevious className='static h-5 w-5 translate-x-0 translate-y-0' />
            </button>
            <button className='absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm'>
              <CarouselNext className='static h-5 w-5 translate-x-0 translate-y-0' />
            </button>
          </Carousel>
        </div>
      </div>
    </div>
  </div>
);
