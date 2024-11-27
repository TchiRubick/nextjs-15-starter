'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useScopedI18n } from '@/locales/client';
import { Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail } from 'lucide-react';

export const ContactForm = () => {
  const tContact = useScopedI18n('contact');

  return (
    <div className='w-full py-10 lg:py-10'>
      <div className='container mx-auto max-w-6xl'>
        <div className='grid gap-10 rounded-xl border border-foreground/20 bg-white p-8 lg:grid-cols-2 lg:p-16'>
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-4'>
              <div>
                <Badge>{tContact('contact')}</Badge>
              </div>
              <div className='flex flex-col gap-2'>
                <h4 className='font-regular max-w-xl text-left text-3xl tracking-tighter md:text-5xl'>
                  {tContact('welcome')}
                </h4>
                <p className='max-w-sm text-left text-lg leading-relaxed tracking-tight text-muted-foreground'>
                  {tContact('description')}
                </p>
              </div>
            </div>
            <div className='flex flex-row items-start gap-6 text-left'>
              <Check className='mt-2 h-4 w-4 text-primary' />
              <div className='flex flex-col gap-1'>
                <p>{tContact('easyToUse')}</p>
                <p className='text-sm text-muted-foreground'>
                  {tContact('easyToUseDescription')}
                </p>
              </div>
            </div>
            <div className='flex flex-row items-start gap-6 text-left'>
              <Check className='mt-2 h-4 w-4 text-primary' />
              <div className='flex flex-col gap-1'>
                <p>{tContact('fastReliable')}</p>
                <p className='text-sm text-muted-foreground'>
                  {tContact('fastReliableDescription')}
                </p>
              </div>
            </div>
            <div className='flex flex-row items-start gap-6 text-left'>
              <Check className='mt-2 h-4 w-4 text-primary' />
              <div className='flex flex-col gap-1'>
                <p>{tContact('beautifulModern')}</p>
                <p className='text-sm text-muted-foreground'>
                  {tContact('beautifulModernDescription')}
                </p>
                <div className='flex flex-col sm:flex-row sm:space-x-3'>
                  <Link href={`https://wa.me/0347804228`} target={'_blank'}>
                    <Button className='mt-2 w-full bg-green-500 text-white hover:bg-green-600 sm:w-auto'>
                      Whatsapp
                      <Image
                        src={'/illustration/whatsapp-svgrepo-com.svg'}
                        alt={'Whatsapp icon'}
                        width={20}
                        height={20}
                      />
                    </Button>
                  </Link>
                  <Link href='mailto:andersonsuiriex@gmail.com' target='_blank'>
                    <Button className='mt-2 w-full text-white sm:w-fit'>
                      {tContact('email')}
                      <Mail />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className='flex w-full items-center justify-center bg-white'>
            <Image
              src={'/illustration/contactus.svg'}
              alt={'Whatsapp icon'}
              width={800}
              height={800}
              className='hidden lg:block'
            />
          </div>
        </div>
      </div>
    </div>
  );
};
