import BlurFade from '@/components/ui/blur-fade';
import { Check } from 'lucide-react';
import { Sweeper } from './sweeper';

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
  <div className='w-full bg-white'>
    <div className='container mx-auto'>
      <div className='grid grid-cols-1 items-start gap-24 rounded-[2rem] bg-neutral-50 p-12 lg:grid-cols-2'>
        {/* Left Column */}
        <div>
          <h2 className='text-[2.75rem] font-normal leading-[1.2] tracking-tight text-neutral-900'>
            Équipements et services
          </h2>
          <p className='mt-2 text-lg text-neutral-500'>Pour votre bien être</p>

          <div className='mt-12 grid gap-4'>
            {amenities.map((amenity) => (
              <div key={amenity} className='flex items-center gap-3'>
                <Check className='h-5 w-5 stroke-[1.5px]' />
                <span className='text-[15px] text-neutral-600'>{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <BlurFade>
          <Sweeper />
        </BlurFade>
      </div>
    </div>
  </div>
);
