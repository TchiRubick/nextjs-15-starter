import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, PhoneCall } from 'lucide-react';
import Link from 'next/link';

export const CTA = () => (
  <div className='w-full bg-slate-900 py-24'>
    <div className='container mx-auto px-4'>
      <div className='flex flex-col items-center gap-8 text-center'>
        <div>
          <Badge className='bg-white/10 text-white hover:bg-white/20'>
            Réservez maintenant
          </Badge>
        </div>
        <div className='flex flex-col items-center gap-4'>
          <h3 className='mx-auto max-w-xl text-3xl font-medium tracking-tight text-white md:text-5xl'>
            Planifiez vos prochaines vacances à la montagne
          </h3>
          <p className='mx-auto max-w-2xl text-lg leading-relaxed tracking-tight text-slate-300'>
            Profitez d&apos;un séjour inoubliable dans nos chalets avec accès
            direct aux pistes. Que ce soit pour du ski en hiver ou des
            randonnées en été, nos hébergements vous offrent tout le confort
            nécessaire pour des vacances réussies.
          </p>
        </div>
        <div className='flex flex-col sm:flex-row w-full sm:w-auto gap-4'>
          <Link href='/contact'>
            <Button
              className='w-full gap-2 bg-white/10 text-white hover:bg-white/20'
              variant='ghost'
              size='lg'
            >
              Nous contacter <PhoneCall className='h-4 w-4' />
            </Button>
          </Link>
          <Link href='#properties'>
            <Button
              className='w-full gap-2 bg-white text-slate-900 hover:bg-white/90'
              size='lg'
            >
              Réserver maintenant <Calendar className='h-4 w-4' />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  </div>
);
