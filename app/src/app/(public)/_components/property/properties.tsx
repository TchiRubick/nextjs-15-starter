'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import { getFilteredPropertiesQuery } from '@/actions/product.action';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';
import { motion } from 'framer-motion';
import { Bath, Bed, House, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Filter } from './_components/filter';

export const Properties = ({
  products,
}: {
  products: Awaited<ReturnType<typeof getFilteredPropertiesQuery>>;
}) => {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className='container mx-auto flex flex-col items-center space-y-8 px-4 py-12'
    >
      <div className='text-center'>
        <h2 className='mb-4 text-4xl font-semibold tracking-tight text-foreground md:text-7xl'>
          Réserver votre séjour
        </h2>
        <p className='text-lg text-slate-600'>
          Découvrez nos chalets disponibles et trouvez votre havre de paix
        </p>
      </div>

      <Filter reload />

      {products.length === 0 && (
        <div className='mt-12 flex flex-col items-center justify-center'>
          <p className='mb-8 text-slate-600'>
            Veuillez modifier vos critères de recherche
          </p>
          <Image
            src='/illustration/undraw_house_searching_re_stk8.svg'
            alt='no data'
            width={400}
            height={400}
            className='opacity-80'
          />
        </div>
      )}

      {products.length > 0 && (
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/property/${product.id}`}
              className='group block w-full transition-transform hover:-translate-y-1'
            >
              <Card className='h-full overflow-hidden border-none bg-white shadow-md transition-shadow hover:shadow-xl'>
                <CardHeader className='relative p-0'>
                  <CardTitle>
                    <Carousel className='w-full'>
                      <CarouselContent>
                        {product.images.map((image) => (
                          <CarouselItem key={image.id}>
                            <div className='relative aspect-[4/3] w-full overflow-hidden'>
                              <Image
                                src={image.image.url}
                                alt={image.image.url}
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
                        {product.name}
                      </h3>
                    </div>

                    <p className='line-clamp-2 text-sm text-slate-600'>
                      {product.description}
                    </p>

                    <div className='flex flex-wrap gap-2'>
                      {product.amenities.slice(0, 2).map((amenity) => (
                        <span
                          key={amenity.amenity.name}
                          className='rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600'
                        >
                          {amenity.amenity.name}
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
                            {product.bed}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>{product.bed} lit(s)</TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger className='flex flex-col items-center gap-1'>
                          <Bath className='h-4 w-4 text-slate-600' />
                          <span className='text-sm font-medium'>
                            {product.bath}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          {product.bath} salle(s) de bain
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger className='flex flex-col items-center gap-1'>
                          <House className='h-4 w-4 text-slate-600' />
                          <span className='text-sm font-medium'>
                            {product.room}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          {product.room} chambre(s)
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger className='flex flex-col items-center gap-1'>
                          <User className='h-4 w-4 text-slate-600' />
                          <span className='text-sm font-medium'>
                            {product.maxPerson}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          {product.maxPerson} personne(s) max
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
                        Nuite: {product.price} Euros
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </motion.main>
  );
};
