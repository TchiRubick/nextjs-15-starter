'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Check, MoveRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const ContactForm = () => {
  return (
    <div className='w-full py-20 lg:py-40'>
      <div className='container mx-auto max-w-6xl'>
        <div className='grid gap-10 lg:grid-cols-2'>
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-4'>
              <div>
                <Badge>Contact</Badge>
              </div>
              <div className='flex flex-col gap-2'>
                <h4 className='font-regular max-w-xl text-left text-3xl tracking-tighter md:text-5xl'>
                  Something new
                </h4>
                <p className='max-w-sm text-left text-lg leading-relaxed tracking-tight text-muted-foreground'>
                  Managing a small business today is already tough. Avoid
                  further complications by ditching outdated, tedious trade
                  methods.
                </p>
              </div>
            </div>
            <div className='flex flex-row items-start gap-6 text-left'>
              <Check className='mt-2 h-4 w-4 text-primary' />
              <div className='flex flex-col gap-1'>
                <p>Easy to use</p>
                <p className='text-sm text-muted-foreground'>
                  We&apos;ve made it easy to use and understand.
                </p>
              </div>
            </div>
            <div className='flex flex-row items-start gap-6 text-left'>
              <Check className='mt-2 h-4 w-4 text-primary' />
              <div className='flex flex-col gap-1'>
                <p>Fast and reliable</p>
                <p className='text-sm text-muted-foreground'>
                  We&apos;ve made it easy to use and understand.
                </p>
              </div>
            </div>
            <div className='flex flex-row items-start gap-6 text-left'>
              <Check className='mt-2 h-4 w-4 text-primary' />
              <div className='flex flex-col gap-1'>
                <p>Beautiful and modern</p>
                <p className='text-sm text-muted-foreground'>
                  We&apos;ve made it easy to use and understand.
                </p>
                <Link href={`https://wa.me/0347804228`} target={'_blank'}>
                  <Button className='mt-2 w-full bg-green-500 text-white hover:bg-green-600'>
                    <Image
                      src={'/svg/whatsapp-svgrepo-com.svg'}
                      alt={'Whatsapp icon'}
                      width={20}
                      height={20}
                    />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className='flex w-full items-center justify-center'>
            <div className='flex w-full flex-col gap-4 rounded-md p-8 md:border'>
              <p>Book a meeting</p>
              <div className='grid w-full items-center gap-1'>
                <Label htmlFor='name'>Name</Label>
                <Input id='name' type='text' />
              </div>
              <div className='grid w-full items-center gap-1'>
                <Label htmlFor='email'>Email</Label>
                <Input id='email' type='email' />
              </div>
              <div className='grid w-full items-center gap-1'>
                <Label htmlFor='object'>Objet</Label>
                <Input id='object' type='text' />
              </div>
              <div className='grid w-full items-center gap-1'>
                <Label htmlFor='message'>Message</Label>
                <Textarea id='message' />
              </div>
              <Button className='w-full gap-4'>
                Book the meeting <MoveRight className='h-4 w-4' />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
