'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { MoveRight, PhoneCall, Snowflake, Star, Wifi } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const Hero = () => {
  return (
    <div className='relative w-full overflow-hidden bg-white py-12'>
      <div className='absolute left-1/4 top-0 -z-10 h-[500px] w-[500px] rounded-full bg-slate-50/50 blur-3xl' />
      <div className='absolute right-0 top-1/3 -z-10 h-[400px] w-[400px] rounded-full bg-slate-100/50 blur-3xl' />

      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 items-center gap-8 md:grid-cols-2 lg:gap-12'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='relative z-10 mx-auto max-w-6xl px-4 pt-32'
          >
            <div className='mb-24 max-w-2xl'>
              <Badge
                variant='outline'
                className='mb-6 rounded-full border-slate-900/10 bg-white/80 px-4 py-1.5 text-sm shadow-sm backdrop-blur-sm'
              >
                ✨ Accès skis aux pieds
              </Badge>

              <h1 className='mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl'>
                Refuges des{' '}
                <span className='relative'>
                  <span className='bg-gradient-to-r from-slate-900 to-slate-900/80 bg-clip-text text-transparent'>
                    Hauts
                  </span>
                  <span className='absolute -bottom-2 left-0 h-2 w-full bg-slate-100' />
                </span>
              </h1>

              <p className='mb-8 text-lg text-slate-600 sm:text-xl'>
                Découvrez notre chalet d&apos;exception à Bussang, au cœur des
                Vosges. Profitez d&apos;une vue imprenable sur la montagne,
                d&apos;un accès direct aux pistes en hiver et de superbes
                randonnées en été.
              </p>

              <div className='mb-8 flex flex-wrap gap-4'>
                <Link href='#properties'>
                  <Button
                    size='lg'
                    className='group bg-slate-900 text-white transition-all hover:bg-slate-800'
                  >
                    Réserver maintenant
                    <MoveRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
                  </Button>
                </Link>

                <Link href='/contact'>
                  <Button
                    size='lg'
                    variant='outline'
                    className='group border-slate-200 bg-white/80 backdrop-blur-sm transition-all hover:bg-slate-50'
                  >
                    Nous contacter
                    <PhoneCall className='ml-2 h-4 w-4 transition-transform group-hover:rotate-12' />
                  </Button>
                </Link>
              </div>

              <div className='flex flex-wrap items-center gap-6 text-sm text-slate-600'>
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

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='relative hidden aspect-square md:block'
          >
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-4'>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Image
                    className='rounded-2xl object-cover shadow-lg'
                    src='/275327112.jpg'
                    alt='Chalet en automne'
                    width={300}
                    height={300}
                    priority
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Image
                    className='rounded-2xl object-cover shadow-lg'
                    src='/276236891.jpg'
                    alt='Chalet sous la neige'
                    width={300}
                    height={300}
                    priority
                  />
                </motion.div>
              </div>
              <div className='pt-8'>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Image
                    className='rounded-2xl object-cover shadow-lg'
                    src='/276286339.jpg'
                    alt='Vue panoramique du chalet'
                    width={300}
                    height={600}
                    priority
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};