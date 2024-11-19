import { getFilteredPropertiesQuery } from '@/actions/product.action';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { TODAY, TOMORROW } from '@/lib/date';
import { stringToNumber } from '@/lib/number';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';
import { format } from 'date-fns';
import { Bath, Bed, House, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import qs from 'query-string';
import { Filter } from '../_components/filter';

export default async function Properties({
  searchParams,
}: {
  searchParams: Promise<{
    min_price?: string;
    max_price?: string;
    check_in?: string;
    check_out?: string;
  }>;
}) {
  const param = await searchParams;

  const payload = {
    min_price:
      stringToNumber(param.min_price) > 0
        ? stringToNumber(param.min_price)
        : 30,
    max_price:
      stringToNumber(param.max_price) > 0
        ? stringToNumber(param.max_price)
        : 100,
    check_in: param.check_in ? new Date(param.check_in) : TODAY,
    check_out: param.check_out ? new Date(param.check_out) : TOMORROW,
  };

  const properties = await getFilteredPropertiesQuery(payload);

  const scheduleParams = qs.stringify({
    check_in: format(payload.check_in, 'yyyy-MM-dd'),
    check_out: format(payload.check_out, 'yyyy-MM-dd'),
  });

  return (
    <div className='container mx-auto mt-16 flex flex-col gap-8 text-center'>
      <h2 className='mb-4 text-4xl font-semibold tracking-tight text-foreground md:text-7xl'>
        Réserver votre séjour
      </h2>
      <p className='text-lg text-slate-600'>
        Découvrez nos chalets disponibles et trouvez votre havre de paix
      </p>

      <Filter defaultValues={payload} />

      {properties.length === 0 && (
        <div className='mt-12 flex flex-col items-center justify-center'>
          <p className='mb-8 font-semibold text-slate-600'>
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

      {properties.length > 0 && (
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {properties.map((product) => (
            <div
              key={product.id}
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
                <Link href={`/properties/${product.id}?${scheduleParams}`}>
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
                </Link>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
