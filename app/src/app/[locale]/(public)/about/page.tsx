'use server';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { getScopedI18n } from '@/locales/server';
import Image from 'next/image';
import Link from 'next/link';

const About = async () => {
  const tAbout = await getScopedI18n('about');

  return (
    <main>
      <Card className='mx-auto mt-10 w-5/6 border-none'>
        <CardHeader>
          <CardTitle className='font-regular text-center text-xl tracking-tighter md:text-3xl lg:max-w-xl lg:text-5xl xl:text-left'>
            {tAbout('title')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className='max-w-xl text-center text-lg leading-relaxed tracking-tight lg:text-left'>
            {tAbout('subtitle')}
            <Label className='text-lg font-bold'>Refuges des Hauts</Label>
            {tAbout('description')}
          </p>
          <div className='flex flex-col items-center gap-4 md:flex-row md:gap-10'>
            <Image
              src='/illustration/undraw_books_re_8gea.svg'
              alt='undraw_books_re_8gea'
              width={1000}
              height={1000}
              className='mt-10 h-56 w-56 object-contain'
            />
            <p className='flex items-center text-center text-lg leading-relaxed tracking-tight'>
              {tAbout('story')}
            </p>
          </div>
          <div className='flex flex-col items-center gap-4 md:flex-row md:gap-10'>
            <p className='flex items-center text-center text-lg leading-relaxed tracking-tight'>
              {tAbout('mission')}
            </p>
            <Image
              src='/illustration/undraw_step_to_the_sun_nxqq.svg'
              alt='undraw_books_re_8gea'
              width={1000}
              height={1000}
              className='mt-10 h-56 w-56 object-contain'
            />
          </div>
          <p className='mt-10 flex items-center text-center text-lg font-semibold leading-relaxed tracking-tight'>
            {tAbout('team')}
          </p>
          <div className='mt-10'>
            <div className='h-1/2 w-full'>
              <Image
                className='h-96 w-full rounded-xl object-cover object-center'
                src='/images/123456788.jpg'
                alt='sr'
                width={1000}
                height={900}
              />
            </div>
          </div>
          <div className='flex flex-col items-center justify-between gap-4 md:flex-row md:gap-10'>
            <p className='max-w-xl text-center text-lg leading-relaxed tracking-tight lg:text-left'>
              {tAbout('descriptionChalet')}
            </p>
            <Image
              src='/illustration/undraw_dreamer_re_9tua.svg'
              alt='undraw_books_re_8gea'
              width={1000}
              height={1000}
              className='h-56 w-56 object-contain'
            />
          </div>
          <div>
            <h3>{tAbout('values.valueTitle')}</h3>
            <ul className='list-inside list-disc'>
              <li>
                <span className='font-semibold'>
                  {tAbout('values.value1.title')}
                </span>
                {tAbout('values.value1.description')}
              </li>
              <li>
                <span className='font-semibold'>
                  {tAbout('values.value2.title')}
                </span>
                {tAbout('values.value2.description')}
              </li>
              <li>
                <span className='font-semibold'>
                  {tAbout('values.value3.title')}
                </span>
                {tAbout('values.value3.description')}
              </li>
              <li>
                <span className='font-semibold'>
                  {tAbout('values.value4.title')}
                </span>
                {tAbout('values.value4.description')}
              </li>
              <li>
                <span className='font-semibold'>
                  {tAbout('values.value5.title')}
                </span>
                {tAbout('values.value5.description')}
              </li>
              <li>
                <span className='font-semibold'>
                  {tAbout('values.value6.title')}{' '}
                </span>
                {tAbout('values.value6.description')}
              </li>
            </ul>
          </div>
          <div className='mt-10'>
            <p className='text-center text-lg leading-relaxed tracking-tight'>
              {tAbout('contact.contactDescription')}
            </p>
            <p className='text-center text-lg leading-relaxed tracking-tight'>
              {tAbout('contact.help')}
              <Link href='/contact' className='text-blue-500 underline'>
                {tAbout('contact.contactButton')}
              </Link>{' '}
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default About;
