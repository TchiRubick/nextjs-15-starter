'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { MoveRight, PhoneCall } from 'lucide-react';
import Image from 'next/image';

export const Hero = () => {
  return (
    <div className='relative w-full overflow-hidden bg-white py-12'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 items-center gap-8 md:grid-cols-2 lg:gap-12'>
          <div className='relative z-10 mx-auto max-w-6xl px-4 pt-32'>
            <div className='mb-24 max-w-2xl'>
              <Badge
                variant='outline'
                className='mb-6 rounded-full border-slate-900/20 bg-slate-50/10 px-4 py-1 text-sm backdrop-blur-sm'
              >
                ✨ Nouveau sur Bussang
              </Badge>

              <h1 className='mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl'>
                Refuges des{' '}
                <span className='bg-gradient-to-r from-slate-900 to-slate-900/80 bg-clip-text text-transparent'>
                  Hauts
                </span>
              </h1>

              <p className='mb-8 text-lg text-muted-foreground sm:text-xl'>
                Vivez une expérience inoubliable dans notre chalet d'exception.
                Une expérience unique au cœur des Vosges, alliant confort
                moderne et authenticité de la montagne.
              </p>

              <div className='flex flex-wrap gap-4'>
                <Button
                  size='lg'
                  className='group bg-slate-900 text-white hover:bg-slate-900/90'
                >
                  Réserver maintenant
                  <MoveRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
                </Button>

                <Button
                  size='lg'
                  variant='outline'
                  className='border-slate-900/20 bg-slate-50/10 backdrop-blur-sm hover:bg-slate-50/20'
                >
                  Nous contacter
                  <PhoneCall className='ml-2 h-4 w-4' />
                </Button>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className='relative hidden aspect-square pt-10 md:block'
          >
            <div className='grid grid-cols-2 gap-3'>
              <div className='space-y-3'>
                <Image
                  className='rounded-2xl object-cover shadow-lg transition-transform hover:z-10 hover:scale-105'
                  src='/275327112.jpg'
                  alt='Chalet en automne'
                  width={300}
                  height={300}
                  priority
                />
                <Image
                  className='rounded-2xl object-cover shadow-lg transition-transform hover:z-10 hover:scale-105'
                  src='/276236891.jpg'
                  alt='Chalet sous la neige'
                  width={300}
                  height={300}
                  priority
                />
              </div>
              <div className='pt-6'>
                <Image
                  className='rounded-2xl object-cover shadow-lg transition-transform hover:z-10 hover:scale-105'
                  src='/276286339.jpg'
                  alt='Vue panoramique du chalet'
                  width={300}
                  height={600}
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
