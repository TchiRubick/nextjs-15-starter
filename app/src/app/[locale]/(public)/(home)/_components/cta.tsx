'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { MoveRight, PhoneCall } from 'lucide-react';
import Link from 'next/link';

export const CTA = () => (
  <div className='w-full bg-slate-200 py-24'>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 2 }}
      className='container mx-auto px-4'
    >
      <div className='flex flex-col items-center gap-8 text-center'>
        <div>
          <Badge className='cursor-default bg-white/10 text-foreground hover:bg-white/20'>
            Réservez maintenant
          </Badge>
        </div>
        <div className='flex flex-col items-center gap-4'>
          <h3 className='mx-auto text-3xl font-semibold tracking-tight text-foreground md:text-7xl'>
            Planifiez vos prochaines vacances à la montagne
          </h3>
          <p className='mx-auto max-w-2xl text-lg leading-relaxed tracking-tight text-gray-900'>
            Profitez d&apos;un séjour inoubliable dans nos chalets avec accès
            direct aux pistes. Que ce soit pour du ski en hiver ou des
            randonnées en été, nos hébergements vous offrent tout le confort
            nécessaire pour des vacances réussies.
          </p>
        </div>
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
              <span className='text-xl text-slate-900'>Nous contacter</span>
              <PhoneCall className='ml-2 h-4 w-4 transition-transform group-hover:rotate-12' />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  </div>
);
