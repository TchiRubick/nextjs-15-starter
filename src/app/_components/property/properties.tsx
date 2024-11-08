'use server';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import InternalError from '@/lib/error';
import { getAvailability } from '@packages/uplisting/src/getAvailability';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';
import { Bath, Bed, House, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Filter } from './_components/filter';

export const Properties = async ({
  availabilities,
}: {
  availabilities: Awaited<ReturnType<typeof getAvailability>>;
}) => {
  return (
    <main className='container mx-auto flex flex-col items-center space-y-8 px-4 py-12'>
      <div className='text-center'>
        <h2 className='mb-4 text-4xl font-medium tracking-tight text-slate-900 md:text-5xl'>
          Réserver votre séjour
        </h2>
        <p className='text-lg text-slate-600'>
          Découvrez nos chalets disponibles et trouvez votre havre de paix
        </p>
      </div>

      <Filter />

      {(availabilities instanceof InternalError ||
        availabilities.length === 0) && (
        <div className='mt-12 flex flex-col items-center justify-center'>
          <h3 className='mb-6 text-2xl font-bold text-slate-900'>
            Aucune disponibilité trouvée
          </h3>
          <p className='mb-8 text-slate-600'>
            Essayez de modifier vos critères de recherche
          </p>
          <Image
            src='/illustration/undraw_empty_re_opql.svg'
            alt='no data'
            width={400}
            height={400}
            className='opacity-80'
          />
        </div>
      )}

      {Array.isArray(availabilities) && availabilities.length > 0 && (
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {availabilities.map((item) => (
            <Link
              key={item.id}
              href={`/property/${item.id}`}
              className='group block w-full transition-transform hover:-translate-y-1'
            >
              <Card className='h-full overflow-hidden border-none bg-white shadow-md transition-shadow hover:shadow-xl'>
                <CardHeader className='relative p-0'>
                  <CardTitle>
                    <Carousel className='w-full'>
                      <CarouselContent>
                        {item.photos.map((photo) => (
                          <CarouselItem key={photo.url}>
                            <div className='relative aspect-[4/3] w-full overflow-hidden'>
                              <Image
                                src={photo.url}
                                alt={photo.created_at}
                                fill
                                className='object-cover transition-transform group-hover:scale-105'
                              />
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className='left-4 h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100' />
                      <CarouselNext className='right-4 h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100' />
                    </Carousel>
                  </CardTitle>
                </CardHeader>

                <CardContent className='flex h-full flex-col p-4'>
                  <div className='mb-4 space-y-3'>
                    <div>
                      <h3 className='mb-2 text-xl font-semibold text-slate-900'>
                        {item.name}
                      </h3>
                    </div>

                    <p className='line-clamp-2 text-sm text-slate-600'>
                      {item.description}
                    </p>

                    <div className='flex flex-wrap gap-2'>
                      {item.amenities.slice(0, 2).map((amenity) => (
                        <span
                          key={amenity.group}
                          className='rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600'
                        >
                          {amenity.values[0]}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className='grid grid-cols-4 gap-2 border-t border-slate-100 py-4'>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className='flex flex-col items-center gap-1'>
                          <Bed className='h-4 w-4 text-slate-600' />
                          <span className='text-sm font-medium'>
                            {item.rooms.beds}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          {item.rooms.beds} lit(s)
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger className='flex flex-col items-center gap-1'>
                          <Bath className='h-4 w-4 text-slate-600' />
                          <span className='text-sm font-medium'>
                            {item.rooms.bathrooms}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          {item.rooms.bathrooms} salle(s) de bain
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger className='flex flex-col items-center gap-1'>
                          <House className='h-4 w-4 text-slate-600' />
                          <span className='text-sm font-medium'>
                            {item.rooms.bedrooms}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          {item.rooms.bedrooms} chambre(s)
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger className='flex flex-col items-center gap-1'>
                          <User className='h-4 w-4 text-slate-600' />
                          <span className='text-sm font-medium'>
                            {item.capacity}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          {item.capacity} personne(s) max
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <div className='flex items-center justify-between border-t border-slate-100 pt-4'>
                    <div className='text-sm italic text-slate-600'>
                      Check-in à partir de 15h
                    </div>
                    <div className='flex items-baseline gap-1 font-medium'>
                      <span className='text-sm italic text-slate-600'>
                        Devis: {item.currency}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
};
