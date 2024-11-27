import { getFilteredPropertiesQuery } from '@/actions/product.action';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { stringToNumber } from '@/lib/number';
import { getScopedI18n } from '@/locales/server';
import { ScheduleSelect } from '@packages/db/models/schedule';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';
import { addDays, format } from 'date-fns';
import { AreaChart, Bath, Bed, House, TriangleAlert, User } from 'lucide-react';
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
  const tProperties = await getScopedI18n('properties');

  const payload = {
    min_price: stringToNumber(param.min_price),
    max_price: stringToNumber(param.max_price),
    check_in: param.check_in ?? format(new Date(), 'yyyy-MM-dd'),
    check_out: param.check_out ?? format(addDays(new Date(), 1), 'yyyy-MM-dd'),
  };

  const properties = await getFilteredPropertiesQuery(payload);

  const scheduleParams = qs.stringify({
    ...(payload.check_in ? { check_in: payload.check_in } : {}),
    ...(payload.check_out ? { check_out: payload.check_out } : {}),
  });

  const reservationLabel = (s: ScheduleSelect) => {
    switch (s.status) {
      case 'validated':
        return tProperties('reservationLabelValidated', {
          start: format(s.startDate, 'dd/MM/yyyy'),
          end: format(s.endDate, 'dd/MM/yyyy'),
        });

      case 'refused':
        return tProperties('reservationLabelRejected');

      case 'pending':
        return tProperties('reservationLabelPending', {
          start: format(s.startDate, 'dd/MM/yyyy'),
          end: format(s.endDate, 'dd/MM/yyyy'),
        });

      default:
        break;
    }
  };

  return (
    <div className='container mx-auto mt-16 flex flex-col gap-8 text-center'>
      <h2 className='mb-4 text-4xl font-semibold tracking-tight text-foreground md:text-7xl'>
        {tProperties('bookingTitle')}
      </h2>
      <p className='text-lg text-slate-600'>{tProperties('description')}</p>

      <Filter defaultValues={payload} />

      {properties.length === 0 && (
        <div className='mt-12 flex flex-col items-center justify-center'>
          <p className='mb-8 font-semibold text-slate-600'>
            {tProperties('noResults')}
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
              <Card className='mx-4 h-full overflow-hidden border-none bg-white shadow-md transition-shadow hover:shadow-xl sm:mx-0'>
                <CardHeader className='relative p-0'>
                  {product.schedules.length > 0 && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className='absolute bottom-2 left-2 z-20 flex items-center justify-center rounded-full bg-red-300 p-1 px-2 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-red-200 hover:text-slate-700 data-[state=open]:bg-red-200 data-[state=open]:text-slate-700'>
                          <TriangleAlert className='h-4 w-4' />{' '}
                          {tProperties('unavailable')}
                        </TooltipTrigger>
                        <TooltipContent className='z-50 rounded-lg border border-red-300 bg-red-100 p-2 text-sm text-slate-600 shadow-lg shadow-black/5 outline-none data-[entering]:animate-in data-[exiting]:animate-out data-[entering]:fade-in-0 data-[exiting]:fade-out-0 data-[entering]:zoom-in-95 data-[exiting]:zoom-out-95 data-[placement=bottom]:slide-in-from-top-2 data-[placement=left]:slide-in-from-right-2 data-[placement=right]:slide-in-from-left-2 data-[placement=top]:slide-in-from-bottom-2'>
                          <div className='rounded-lg p-2 text-sm'>
                            {product.schedules.map((schedule) => (
                              <div key={schedule.id}>
                                {reservationLabel(schedule)}
                              </div>
                            ))}
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  <CardTitle className='relative'>
                    <Carousel className='z-auto w-full'>
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

                    <div className='grid grid-cols-5 gap-2 border-t border-slate-100 py-4'>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger className='flex flex-col items-center gap-1'>
                            <Bed className='h-4 w-4 text-slate-600' />
                            <span className='text-sm font-medium'>
                              {product.bed}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            {tProperties('beds', { count: product.bed })}
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger className='flex flex-col items-center gap-1'>
                            <Bath className='h-4 w-4 text-slate-600' />
                            <span className='text-sm font-medium'>
                              {product.bath}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            {tProperties('baths', { count: product.bath })}
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
                            {tProperties('rooms', { count: product.room })}
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
                            {tProperties('maxPersons', {
                              count: product.maxPerson,
                            })}
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger className='flex flex-col items-center gap-1'>
                            <AreaChart className='h-4 w-4 text-slate-600' />
                            <span className='text-sm font-medium'>
                              {product.area ?? '-'}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            {tProperties('area', {
                              count: product.area ?? '-',
                            })}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>

                    <div className='flex items-center justify-between border-t border-slate-100 pt-4'>
                      <div className='text-sm italic text-slate-600'>
                        {tProperties('checkInTime')}
                      </div>
                      <div className='flex items-baseline gap-1 font-medium'>
                        <span className='text-sm italic text-slate-600'>
                          {tProperties('nightlyRate', { price: product.price })}
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
