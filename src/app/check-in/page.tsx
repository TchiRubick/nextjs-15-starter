'use server';

import { Filter } from './_components/filter';

import { useSearchParamsServerParser as searchParamsServerParser } from '@/hooks/useSearchParamsServerParser';
import InternalError from '@/lib/error';
import { getAvailability } from '@packages/uplisting';
import Image from 'next/image';
import { MapPin, BedSingle, Bed, Bath, House } from 'lucide-react';
import {
  defaultParamsValidation,
  paramsValidation,
  type ParamsValidation,
} from './_validations';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Label } from '@radix-ui/react-label';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Link from 'next/link';

const CheckInPage = async ({
  searchParams,
}: {
  searchParams: Promise<ParamsValidation>;
}) => {
  const params = await searchParams;

  const values = await searchParamsServerParser(
    params,
    paramsValidation,
    defaultParamsValidation,
    '/check-in'
  );

  const availability = await getAvailability(values);

  return (
    <main className='mt-16 flex min-h-screen flex-col items-center justify-items-start space-y-4'>
      <Filter />
      {(availability instanceof InternalError || availability.length === 0) && (
        <div className='flex flex-col items-center justify-center'>
          <h3 className='py-8 text-2xl font-bold'>
            Aucune disponibilité trouvée
          </h3>
          <Image
            src='/illustration/undraw_empty_re_opql.svg'
            alt='no data'
            width={700}
            height={700}
          />
        </div>
      )}
      {Array.isArray(availability) && availability.length > 0 && (
        <div className='flex flex-row gap-4'>
          {availability.map((item) => (
            <Card key={item.id} className='w-64 rounded-3xl'>
              <CardHeader className='p-0'>
                <CardTitle>
                  <Carousel>
                    <CarouselContent>
                      {item.photos.map((photo) => (
                        <CarouselItem key={photo.url}>
                          <Image
                            src={photo.url}
                            alt={photo.created_at}
                            width={200}
                            height={200}
                            className='h-60 w-full rounded-t-3xl object-cover'
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className='absolute left-2 h-5 w-5' />
                    <CarouselNext className='absolute right-2 h-5 w-5' />
                  </Carousel>
                </CardTitle>
              </CardHeader>
              <Link href={`/check-in/${item.id}`}>
                <CardContent className='flex flex-col space-y-3 p-2'>
                  <Label className='text-lg font-bold'>{item.name}</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className='flex font-serif text-sm'>
                        <MapPin className='mr-2 h-4 w-4' />
                        <span className='overflow-hidden text-ellipsis text-nowrap'>
                          {item.address.street}, {item.address.city},
                          {item.address.state}, {item.address.zip_code},
                          {item.address.country}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        {item.address.street}, {item.address.city},
                        {item.address.state}, {item.address.zip_code},
                        {item.address.country}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardContent>
                <CardFooter className='flex h-fit justify-center space-x-5 pb-2 pt-6 text-sm'>
                  <span className='flex'>
                    <Bed className='mr-2 h-4 w-4' />{' '}
                    <span className='font-bold'>{item.rooms.bedrooms} </span>
                  </span>
                  <span className='flex'>
                    <Bath className='mr-2 h-4 w-4' />
                    <span className='font-bold'>{item.rooms.bathrooms} </span>
                  </span>
                  <span className='flex'>
                    <House className='mr-2 h-4 w-4' />
                    <span className='font-bold'>{item.rooms.bedrooms}</span>
                  </span>
                </CardFooter>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
};

export default CheckInPage;
