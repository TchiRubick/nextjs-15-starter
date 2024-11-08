'use server';

import { Filter } from './_components/filter';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { useSearchParamsServerParser as searchParamsServerParser } from '@/hooks/useSearchParamsServerParser';
import InternalError from '@/lib/error';
import { getAvailability } from '@packages/uplisting';
import { Label } from '@radix-ui/react-label';
import { Bath, Bed, House, MapPin, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {
  defaultParamsValidation,
  paramsValidation,
  type ParamsValidation,
} from './_validations';

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

  const availabilities = await getAvailability(values);

  return (
    <main className='mt-16 flex min-h-screen flex-col items-center justify-items-start space-y-4'>
      <Filter />
      {(availabilities instanceof InternalError ||
        availabilities.length === 0) && (
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
      {Array.isArray(availabilities) && availabilities.length > 0 && (
        <div className='flex flex-row gap-4'>
          {availabilities.map((item) => (
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
              <TooltipProvider>
                <Link className='-z-10' href={`/property/${item.id}`}>
                  <CardContent className='flex flex-col p-3'>
                    <Label className='cursor-pointer text-lg font-bold'>
                      {item.name}
                    </Label>
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
                    <Label className='mt-3 flex space-x-3 text-sm'>
                      <Tooltip>
                        <TooltipTrigger>
                          <span className='flex'>
                            <Bed className='mr-1 h-4 w-4' />
                            <span className='font-bold'>
                              {item.rooms.beds}{' '}
                            </span>
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          {item.rooms.bedrooms} lit(s)
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger>
                          <span className='flex'>
                            <Bath className='mr-1 h-4 w-4' />
                            <span className='font-bold'>
                              {item.rooms.bathrooms}
                            </span>
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          {item.rooms.bathrooms} salle de bain
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger>
                          <span className='flex'>
                            <House className='mr-1 h-4 w-4' />
                            <span className='font-bold'>
                              {item.rooms.bedrooms}
                            </span>
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          {item.rooms.bedrooms} chambre(s)
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger>
                          <span className='flex'>
                            <User className='mr-1 h-4 w-4' />
                            <span className='font-bold'>{item.capacity}</span>
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          {item.capacity} personne(s) max
                        </TooltipContent>
                      </Tooltip>
                    </Label>
                  </CardContent>
                </Link>
              </TooltipProvider>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
};

export default CheckInPage;
