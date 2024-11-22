'use client';

import { Button } from '@/components/ui/button';
import { useScopedI18n } from '@/locales/client';
import Image from 'next/image';
import { useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

const images = [
  '/gallery/p.jpg',
  '/gallery/p1.jpg',
  '/gallery/p2.jpg',
  '/gallery/p3.jpg',
  '/gallery/p4.jpg',
  '/gallery/p5.jpg',
  '/gallery/p6.jpg',
  '/gallery/p7.jpg',
  '/gallery/p8.jpg',
  '/gallery/p9.jpg',
];

const NUMBER_IMAGE_APPEAR_FIRST = 15;

export const Gallery = () => {
  const [offset, setOffset] = useState(0);
  const tGallery = useScopedI18n('gallery');

  const currentImages = images.slice(0, offset + NUMBER_IMAGE_APPEAR_FIRST);

  const loadMoreImages = () => {
    setOffset((prevOffset) => prevOffset + NUMBER_IMAGE_APPEAR_FIRST);
  };

  return (
    <div>
      <div className='flex justify-center'>
        <h1 className='text-4xl font-semibold md:text-6xl md:font-semibold'>
          {tGallery('title')}
        </h1>
      </div>
      <div className='font-regular md:font-regular text-center text-2xl md:mb-3 md:mt-5 md:text-3xl lg:ml-24 lg:text-start'>
        <h6>{tGallery('subtitle')}</h6>
      </div>
      <div className='m-auto w-4/6 md:m-auto md:w-5/6 md:columns-3 md:gap-2'>
        <PhotoProvider>
          {currentImages.map((item, index) => (
            <div className='py-1' key={index}>
              <PhotoView src={item}>
                <Image
                  src={item}
                  alt={tGallery('imageAlt')}
                  className='hover:cursor-pointer hover:shadow-md hover:shadow-slate-600'
                  loading='eager'
                  width={500}
                  height={500}
                />
              </PhotoView>
            </div>
          ))}
        </PhotoProvider>
        {offset + NUMBER_IMAGE_APPEAR_FIRST < images.length && (
          <Button onClick={loadMoreImages}>{tGallery('loadMore')}</Button>
        )}
      </div>
    </div>
  );
};
