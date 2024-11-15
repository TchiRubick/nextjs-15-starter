'use client';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { ArrowLeft, ArrowRight, Plus } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { ImageUploader } from '../../_components/image-uploader';

interface Props {
  id: number;
  urls: string[];
}

export const PicturesSection = ({ id, urls }: Props) => {
  const [selectedImage, setSelectedImage] = useState(urls[1]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleNext = () => {
    const nextIndex = (selectedImageIndex + 1) % urls.length;
    setSelectedImage(urls[nextIndex]);
    setSelectedImageIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (selectedImageIndex - 1 + urls.length) % urls.length;
    setSelectedImage(urls[prevIndex]);
    setSelectedImageIndex(prevIndex);
  };

  return (
    <div className='mx-auto w-[90vw] pt-6 sm:w-[60vw] sm:px-4 md:w-[40vw]'>
      <AspectRatio className='flex h-full flex-col items-center justify-between'>
        <div className='relative h-full w-full'>
          <Image
            src={selectedImage}
            alt='Selected Image'
            fill={true}
            className='m-auto max-h-[95%] max-w-full shadow-md transition-opacity duration-75'
            onLoad={(event) => {
              const target = event.target as HTMLImageElement;
              target.classList.remove('opacity-0');
            }}
          />
          <Button
            variant='secondary'
            className='absolute left-4 top-64 cursor-pointer rounded-full'
            onClick={handlePrev}
          >
            <ArrowLeft />
          </Button>
          <Button
            variant='secondary'
            className='absolute right-4 top-64 cursor-pointer rounded-full'
            onClick={handleNext}
          >
            <ArrowRight />
          </Button>
        </div>
      </AspectRatio>

      <ScrollArea
        className='mt-2 overflow-hidden whitespace-nowrap rounded-md shadow-inner'
        style={{
          backgroundColor: 'var(--background)',
          backdropFilter: 'blur(10px)',
          borderColor: 'var(--border)',
        }}
      >
        <div className='flex w-max space-x-4 p-4'>
          {urls.map((image, index) => (
            <figure key={index} className='shrink-0'>
              <div className='mr-4 overflow-hidden rounded-md shadow-2xl'>
                <div className='relative shadow-lg'>
                  <Image
                    src={image}
                    alt={'Image ' + (index + 1)}
                    className='aspect-square h-fit w-fit cursor-pointer object-cover opacity-0 transition-opacity duration-100'
                    width={100}
                    height={100}
                    onClick={() => {
                      setSelectedImage(image);
                      setSelectedImageIndex(index);
                    }}
                    onLoad={(event) => {
                      const target = event.target as HTMLImageElement;
                      target.classList.remove('opacity-0');
                    }}
                  />
                </div>
              </div>
            </figure>
          ))}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant='secondary'
                className='mt-5 h-[100px] w-[100px] rounded-full border-2 border-dashed border-slate-900/55 transition delay-1000 duration-1000 hover:animate-spin'
              >
                <Plus />
              </Button>
            </DialogTrigger>
            <DialogContent className='flex flex-col items-center justify-center'>
              <DialogTitle>Ajouter des photos</DialogTitle>
              <ImageUploader id={id} />
            </DialogContent>
          </Dialog>
        </div>
        <ScrollBar
          orientation='horizontal'
          className='scrollbar-thumb scrollbar-track'
        />
      </ScrollArea>
    </div>
  );
};
