import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getScopedI18n } from '@/locales/server';
import { PhoneCall } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const FAQ = async () => {
  const [tFAQ, tQuestions] = await Promise.all([
    getScopedI18n('faq'),
    getScopedI18n('faq.questions'),
  ]);

  return (
    <div className='w-full px-4 py-20 lg:px-0 lg:py-40'>
      <div className='container mx-auto'>
        <div className='grid gap-10 lg:grid-cols-2'>
          <div className='flex flex-col gap-10'>
            <div className='flex flex-col gap-4'>
              <div>
                <Badge variant='outline'>{tFAQ('title')}</Badge>
              </div>
              <div className='flex flex-col gap-2'>
                <h4 className='font-regular max-w-xl text-left text-3xl tracking-tighter md:text-5xl'>
                  {tFAQ('subtitle')}
                </h4>
                <p className='max-w-xl text-left text-lg leading-relaxed tracking-tight text-muted-foreground lg:max-w-lg'>
                  {tFAQ('subtitle')}
                </p>
              </div>
              <div className=''>
                <Link href='/contact'>
                  <Button className='w-full gap-4 sm:w-64' variant='outline'>
                    {tFAQ('contact')} <PhoneCall className='h-4 w-4' />
                  </Button>
                </Link>
              </div>
            </div>
            <Image
              alt='FAQ'
              src='/illustration/undraw_faq_re_31cw.svg'
              width={400}
              height={400}
            />
          </div>
          <Accordion type='single' collapsible className='w-full'>
            {Array(9)
              .fill(0)
              .map((_, index) => (
                <AccordionItem key={index} value={'index-' + index}>
                  <AccordionTrigger className='text-left font-bold'>
                    {tQuestions(`${index}.q` as keyof typeof tQuestions)}
                  </AccordionTrigger>
                  <AccordionContent>
                    {tQuestions(`${index}.a` as keyof typeof tQuestions)}
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};
