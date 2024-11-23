'use client';

import { Button } from '@/components/ui/button';
import { fadeIn } from '@/lib/variant';
import { useScopedI18n } from '@/locales/client';
import { motion } from 'framer-motion';
import { MoveRight, PhoneCall, Snowflake, Star, Wifi } from 'lucide-react';
import Link from 'next/link';

export const Hero = () => {
  const tButton = useScopedI18n('button');
  const tHero = useScopedI18n('hero');

  return (
    <div className='bg-hero relative h-[36rem] w-full bg-cover bg-center transition-all duration-1000 sm:h-screen'>
      <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50'>
        <div className='flex items-center gap-8 md:grid-cols-2 lg:gap-12'>
          <motion.div
            variants={fadeIn('right', 0.2)}
            initial='hidden'
            whileInView={'show'}
            viewport={{ once: false, amount: 0.7 }}
            className='relative z-10 mx-auto max-w-6xl px-4'
          >
            <div className='mb-8 max-w-4xl sm:mb-24'>
              <h1 className='mb-6 mt-20 text-center text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-8xl'>
                <span style={{ textShadow: '0 0 2px white' }}>
                  Refuges des{' '}
                </span>
                <span className='bg-gradient-to-r from-emerald-500 to-emerald-500/40 bg-clip-text tracking-tight text-transparent'>
                  Hauts
                </span>
              </h1>

              <p className='my-14 text-center text-lg text-slate-300 sm:text-xl'>
                {tHero('description')}
              </p>

              <div className='flex flex-col flex-wrap justify-center gap-4 sm:mt-20 sm:flex-row sm:gap-4'>
                <Link href='/properties'>
                  <Button
                    size='lg'
                    className='group w-full bg-primary text-white transition-all hover:bg-emerald-700 sm:h-14 sm:w-72'
                  >
                    <span className='text-xl'>{tButton('book')}</span>

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
                      {tButton('contact')}
                    </span>
                    <PhoneCall className='ml-2 h-4 w-4 transition-transform group-hover:rotate-12' />
                  </Button>
                </Link>
              </div>
              <div
                style={{ textShadow: '0 0 20px white' }}
                className='mt-8 flex flex-wrap items-center justify-center gap-6 text-base text-gray-200 sm:mt-24 sm:text-xl'
              >
                <span className='flex items-center sm:gap-1.5'>
                  <Star className='h-4 w-4 text-yellow-400' />
                  {tHero('rating')}
                </span>
                <span className='flex items-center sm:gap-1.5'>
                  <Snowflake className='h-4 w-4' />
                  {tHero('skiRental')}
                </span>
                <span className='flex items-center sm:gap-1.5'>
                  <Wifi className='h-4 w-4' />
                  {tHero('freeWifi')}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
