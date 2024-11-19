'use client';

import { Button } from '@/components/ui/button';
import { fadeIn } from '@/lib/variant';
import { motion } from 'framer-motion';
import { MoveRight, PhoneCall, Snowflake, Star, Wifi } from 'lucide-react';
import Link from 'next/link';

export const Hero = () => {
  return (
    <div className='bg-hero relative h-screen w-full bg-cover bg-center transition-all duration-1000'>
      <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50'>
        {/* -------------------------------------------------------------------------- */}
        <div className='flex items-center gap-8 md:grid-cols-2 lg:gap-12'>
          <motion.div
            variants={fadeIn('right', 0.2)}
            initial='hidden'
            whileInView={'show'}
            viewport={{ once: false, amount: 0.7 }}
            className='relative z-10 mx-auto max-w-6xl px-4'
          >
            <div className='mb-24 max-w-4xl'>
              <h1 className='mb-6 mt-20 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-8xl'>
                <span style={{ textShadow: '0 0 2px white' }}>
                  Refuges des{' '}
                </span>
                <span className='bg-gradient-to-r from-emerald-500 to-emerald-500/40 bg-clip-text tracking-tight text-transparent'>
                  Hauts
                </span>
              </h1>

              <p className='my-14 text-center text-lg text-slate-300 sm:text-xl'>
                Découvrez notre chalet d&apos;exception à Bussang, au cœur des
                Vosges. Profitez d&apos;une vue imprenable sur la montagne,
                d&apos;un accès direct aux pistes en hiver et de superbes
                randonnées en été.
              </p>

              <div className='flex flex-col flex-wrap justify-center gap-4 sm:mt-20 sm:flex-row sm:gap-4'>
                <Link href='/properties'>
                  <Button
                    size='lg'
                    className='group w-full bg-primary text-white transition-all hover:bg-emerald-700 sm:h-14 sm:w-72'
                  >
                    <span className='text-xl'>Réserver maintenant</span>

                    <MoveRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
                  </Button>
                </Link>
                <Link href='/contact'>
                  <Button
                    size='lg'
                    variant='ghost'
                    className='group w-full border-foreground/20 bg-slate-300 text-primary/90 hover:bg-slate-400 sm:h-14 sm:w-72'
                  >
                    <span className='text-xl text-slate-900'>
                      Nous contacter
                    </span>
                    <PhoneCall className='ml-2 h-4 w-4 transition-transform group-hover:rotate-12' />
                  </Button>
                </Link>
              </div>
              <div
                style={{ textShadow: '0 0 20px white' }}
                className='flex flex-wrap items-center justify-center gap-6 text-base text-gray-200 sm:mt-24 sm:text-xl'
              >
                <span className='flex items-center gap-1.5'>
                  <Star className='h-4 w-4 text-yellow-400' />
                  Note couples : 9,8/10
                </span>
                <span className='flex items-center gap-1.5'>
                  <Snowflake className='h-4 w-4' />
                  Location de ski
                </span>
                <span className='flex items-center gap-1.5'>
                  <Wifi className='h-4 w-4' />
                  WiFi gratuit
                </span>
              </div>
            </div>
          </motion.div>
          {/* ----------------------------------------------------------------------------------------------------------------------- */}
        </div>
      </div>
    </div>
  );
};
