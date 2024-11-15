'use client';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
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
    <div className='mx-auto mt-4 flex h-[500px] w-[1000px] md:px-0'>
      <AspectRatio className='h-[500px] items-center rounded-md shadow-md'>
        <div className='relative h-full w-full'>
          <Image
            src={selectedImage}
            alt='Selected Image'
            fill={true}
            className='m-auto max-h-full max-w-full rounded-md shadow-md transition-opacity duration-75'
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

      <ScrollArea className='h-[500px] overflow-hidden rounded-md shadow-inner'>
        <div className='flex h-fit w-fit flex-col space-y-4 p-4'>
          {urls.map((image, index) => (
            <figure key={index} className='shrink-0'>
              <div className='rounded-md'>
                <div className='relative shadow-lg'>
                  <Image
                    src={image}
                    alt={'Image ' + (index + 1)}
                    className='aspect-square h-fit w-fit cursor-pointer object-cover opacity-0 transition-opacity duration-100'
                    width={200}
                    height={200}
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
                className='border-2 border-dashed border-slate-900/55'
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
          orientation='vertical'
          className='scrollbar-thumb scrollbar-track'
        />
      </ScrollArea>
    </div>
  );
};
