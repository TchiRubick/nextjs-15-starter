'use client';

import { Button } from '@/components/ui/button';
import { useScopedI18n } from '@/locales/client';
import { ImageSelect } from '@packages/db/models/image';
import Image from 'next/image';
import { useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

const NUMBER_IMAGE_APPEAR_FIRST = 15;

type props = {
  images: ImageSelect[];
};

export const Gallery = ({ images }: props) => {
  const [offset, setOffset] = useState(0);
  const tGallery = useScopedI18n('gallery');
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
          {images.map((item, index) => (
            <div className='py-1' key={index}>
              <PhotoView src={item.url}>
                <Image
                  src={item.url}
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
