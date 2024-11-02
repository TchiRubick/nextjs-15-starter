'use client';

import { MoveRight, PhoneCall } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

export const Hero = () => {
  return (
    <div className='min-h-[calc(100vh-4rem)] w-full py-12 sm:py-16 lg:py-24'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 items-center gap-8 md:grid-cols-2 lg:gap-12'>
          <div className='flex flex-col gap-4 sm:gap-6'>
            <div>
              <Badge variant='outline' className='text-sm sm:text-base'>
                We&apos;re live!
              </Badge>
            </div>
            <div className='flex flex-col gap-4 sm:gap-6'>
              <h1 className='font-regular max-w-lg text-left text-3xl tracking-tighter sm:text-4xl lg:text-6xl'>
                Refuges des Hauts
              </h1>
              <p className='max-w-md text-left text-base leading-relaxed tracking-tight text-muted-foreground sm:text-lg lg:text-xl'>
                Managing a small business today is already tough. Avoid further
                complications by ditching outdated, tedious trade methods. Our
                goal is to streamline SMB trade, making it easier and faster
                than ever.
              </p>
            </div>
            <div className='flex flex-col gap-3 sm:flex-row sm:gap-4'>
              <Button
                size='lg'
                className='gap-2 text-sm sm:gap-4 sm:text-base'
                variant='outline'
              >
                Jump on a call <PhoneCall className='h-3 w-3 sm:h-4 sm:w-4' />
              </Button>
              <Button size='lg' className='gap-2 text-sm sm:gap-4 sm:text-base'>
                Sign up here <MoveRight className='h-3 w-3 sm:h-4 sm:w-4' />
              </Button>
            </div>
          </div>

          <div className='hidden h-[400px] grid-cols-2 gap-4 sm:h-[500px] sm:gap-6 md:grid lg:h-[600px] lg:gap-8'>
            <Image
              className='aspect-square h-[180px] w-full rounded-md object-cover transition-all duration-300 hover:scale-110 sm:h-[240px] lg:h-[300px]'
              src='/275327112.jpg'
              alt='hero-3'
              width={300}
              height={300}
              priority
            />
            <Image
              className='row-span-2 h-full w-full rounded-md object-cover transition-all duration-300 hover:scale-110'
              src='/276286339.jpg'
              alt='hero-2'
              width={600}
              height={600}
              priority
            />
            <Image
              className='aspect-square h-[180px] w-full rounded-md object-cover transition-all duration-300 hover:scale-110 sm:h-[240px] lg:h-[300px]'
              src='/276236891.jpg'
              alt='hero-1'
              width={300}
              height={300}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};
