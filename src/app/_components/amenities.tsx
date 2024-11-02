import { LampContainer } from '@/components/lamp';
import { Check } from 'lucide-react';

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

export const Amenities = () => (
  <div className='flex w-full flex-col items-center justify-center py-10 lg:py-20'>
    <div className='container mx-auto'>
      <div className='flex flex-col items-start gap-4 py-20 lg:py-40'>
        <div className='flex flex-col gap-2'>
          <h2 className='font-regular text-3xl tracking-tighter md:text-5xl lg:max-w-xl'>
            Équipements et services
          </h2>
          <p className='max-w-xl text-lg leading-relaxed tracking-tight text-muted-foreground lg:max-w-xl'>
            Pour votre bien etre
          </p>
        </div>
        <div className='flex w-full flex-col gap-10 pt-12'>
          <div className='grid grid-cols-2 items-start gap-10 lg:grid-cols-3'>
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
      </div>
    </div>
  </div>
);
