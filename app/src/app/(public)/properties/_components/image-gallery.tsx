'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

type Image = {
  id: number;
  productId: number;
  imageId: number;
  image: {
    id: number;
    url: string;
    bucket: string;
  };
};

interface ImageGalleryProps {
  images: Image[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className='relative mb-8 h-[60vh] w-full overflow-hidden rounded-2xl'>
      <Image
        src={images[currentImageIndex].image.url}
        alt={`Property image ${currentImageIndex + 1}`}
        fill
        className='object-cover'
      />
      <div className='absolute inset-0 bg-black/20' />
      <Button
        variant='secondary'
        size='icon'
        className='absolute left-4 top-1/2 -translate-y-1/2'
        onClick={prevImage}
      >
        <ChevronLeft className='h-6 w-6' />
      </Button>
      <Button
        variant='secondary'
        size='icon'
        className='absolute right-4 top-1/2 -translate-y-1/2'
        onClick={nextImage}
      >
        <ChevronRight className='h-6 w-6' />
      </Button>
      <div className='absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2'>
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full ${
              index === currentImageIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
