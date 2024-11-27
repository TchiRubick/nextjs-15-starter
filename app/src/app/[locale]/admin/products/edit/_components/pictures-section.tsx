'use client';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { ArrowLeft, ArrowRight, Loader2, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { ImageUploaderModal } from '../../_components/input-uploader-modal';
import { useMutationAction } from '@packages/fetch-action/index';
import { deleteImage } from '@/actions/product.action';

interface Props {
  id: number;
  urls: string[];
}

export const PicturesSection = ({ id, urls }: Props) => {
  const [selectedImage, setSelectedImage] = useState(urls[0]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { mutateAsync, isPending } = useMutationAction(deleteImage);

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

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleRemove = async () => {
    await mutateAsync(selectedImage);
  };

  return (
    <div className='mx-auto mt-4 flex h-[500px] w-[1000px] md:px-0'>
      <AspectRatio
        className='h-[500px] items-center rounded-md shadow-md'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className='relative h-full w-full'>
          {isHovered && selectedImage && (
            <div className='absolute inset-0 z-10 mb-3 flex items-end justify-center gap-2'>
              <Button
                variant='secondary'
                className='z-50 cursor-pointer rounded-full'
                onClick={handlePrev}
              >
                <ArrowLeft />
              </Button>
              <Button
                variant='secondary'
                className='z-50 cursor-pointer rounded-full'
                onClick={handleNext}
              >
                <ArrowRight />
              </Button>
              <div className='absolute inset-0 z-10 ml-1 mt-1 flex h-fit w-fit items-start'>
                <Button
                  variant='destructive'
                  className='z-50'
                  onClick={() => handleRemove()}
                >
                  {isPending ? (
                    <Loader2 className='animate-spin' />
                  ) : (
                    <Trash2 />
                  )}
                </Button>
              </div>
            </div>
          )}
          <Image
            src={selectedImage || '/illustration/undraw_uploading_re_okvh.svg'}
            alt='Selected Image'
            fill={true}
            className='m-auto max-h-full max-w-full rounded-md shadow-md'
          />
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
          <ImageUploaderModal id={id} />
        </div>
        <ScrollBar
          orientation='vertical'
          className='scrollbar-thumb scrollbar-track'
        />
      </ScrollArea>
    </div>
  );
};
