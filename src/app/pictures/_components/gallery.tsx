'use client';

import Image from 'next/image';
import { useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { Button } from '@/components/ui/button';
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

  const currentImages = images.slice(0, offset + NUMBER_IMAGE_APPEAR_FIRST);

  const loadMoreImages = () => {
    setOffset((prevOffset) => prevOffset + NUMBER_IMAGE_APPEAR_FIRST);
  };

  return (
    <div className='m-auto w-5/6 columns-3 gap-2'>
      <PhotoProvider>
        {currentImages.map((item, index) => (
          <div className='py-1' key={index}>
            <PhotoView src={item}>
              <Image
                src={item}
                alt='Picture of the author'
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
        <Button onClick={loadMoreImages}>Load More</Button>
      )}
    </div>
  );
};
