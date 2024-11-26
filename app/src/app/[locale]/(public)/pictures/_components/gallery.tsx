'use client';

import { Button } from '@/components/ui/button';
import { useScopedI18n } from '@/locales/client';
import { ImageSelect } from '@packages/db/models/image';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

const NUMBER_IMAGE_APPEAR_FIRST = 5;

type props = {
  images: ImageSelect[];
};

export const Gallery = ({ images }: props) => {
  const [offset, setOffset] = useState(0);
  const tGallery = useScopedI18n('gallery');
  const loadMoreImages = () => {
    setOffset((prevOffset) => prevOffset + NUMBER_IMAGE_APPEAR_FIRST);
  };
  const currentImages = images.slice(0, offset + NUMBER_IMAGE_APPEAR_FIRST);
  return (
    <div>
      <div className='container mx-auto mb-16 mt-16 flex flex-col gap-8 text-center'>
        <h1 className='mb-4 text-4xl font-semibold tracking-tight text-foreground md:text-7xl'>
          {tGallery('title')}
        </h1>
        <div className='text-lg text-slate-600'>
          <h6>{tGallery('subtitle')}</h6>
        </div>
      </div>
      <div className='relative m-auto w-full pb-16 sm:w-4/6 md:m-auto md:w-5/6 md:columns-3 md:gap-1'>
        <PhotoProvider>
          {currentImages.map((item, index) => (
            <div className='p-3' key={index}>
              <PhotoView src={item.url}>
                <Image
                  src={item.url}
                  alt={tGallery('imageAlt')}
                  className='transform rounded-3xl shadow-2xl shadow-emerald-600 transition-transform duration-300 ease-in-out hover:scale-110 hover:cursor-pointer hover:shadow-2xl hover:shadow-emerald-600/50'
                  loading='eager'
                  width={500}
                  height={500}
                />
              </PhotoView>
            </div>
          ))}
        </PhotoProvider>
        {offset + NUMBER_IMAGE_APPEAR_FIRST < images.length && (
          <div className='absolute bottom-0 left-1/3 sm:left-1/2'>
            <Button
              className='transition-all: group bg-emerald-800'
              onClick={loadMoreImages}
            >
              {tGallery('loadMore')}{' '}
              <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
