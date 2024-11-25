'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useScopedI18n } from '@/locales/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Search } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import qs from 'query-string';
import { Controller, useForm } from 'react-hook-form';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import 'react-multi-date-picker/styles/layouts/mobile.css';
import { z } from 'zod';

export const LOCAL_STORAGE_KEY = 'property-filter';

const filterSchema = z.object({
  min_price: z.coerce.number().min(0).optional(),
  max_price: z.coerce.number().min(0).optional(),
  date_range: z.tuple([z.instanceof(DateObject), z.instanceof(DateObject)]),
});

type FilterSchema = z.infer<typeof filterSchema>;

export const Filter = ({
  defaultValues,
}: {
  defaultValues: {
    min_price?: number;
    max_price?: number;
    check_in?: string;
    check_out?: string;
  };
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const tFilter = useScopedI18n('filter');

  const formDefaultValue = {
    min_price: defaultValues.min_price,
    max_price: defaultValues.max_price,
    date_range: [
      defaultValues.check_in
        ? new DateObject(new Date(defaultValues.check_in))
        : new DateObject(),
      defaultValues.check_out
        ? new DateObject(new Date(defaultValues.check_out))
        : new DateObject().add(1, 'day'),
    ] as [DateObject, DateObject],
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: formDefaultValue,
    mode: 'onChange',
    resolver: zodResolver(filterSchema),
  });

  const onSubmit = (data: FilterSchema) => {
    const newParams = qs.stringify({
      ...(data.min_price ? { min_price: data.min_price } : {}),
      ...(data.max_price ? { max_price: data.max_price } : {}),
      ...(data.date_range[0]
        ? { check_in: data.date_range[0].format('YYYY-MM-DD') }
        : {}),
      ...(data.date_range[1]
        ? { check_out: data.date_range[1].format('YYYY-MM-DD') }
        : {}),
    });

    router.push(`${pathname}?${newParams}`, {
      scroll: false,
    });

    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='mx-4 rounded-xl bg-emerald-950 p-6 shadow-xl sm:mx-auto'
    >
      <div className='flex flex-col gap-y-5 md:flex-row md:gap-x-4 '>
        {/* Price Range */}
        <div className=' md:basis-1/2'>
          <Label className='mb-2 block text-sm font-medium text-white/80'>
            {tFilter('priceLabel')}
          </Label>
          <div className='flex sm:flex-row sm:gap-4 flex-col gap-4 '>
            <div className='relative flex-1'>
              <span className='absolute left-3 top-1/2 -translate-y-1/2 text-white'>
                €
              </span>
              <Input
                id='min_price'
                className='h-12 border-0 bg-white/30 pl-8 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary'
                type='number'
                placeholder={tFilter('minPlaceholder')}
                {...register('min_price', {})}
              />
            </div>
            <div className='relative flex-1'>
              <span className='absolute left-3 top-1/2 -translate-y-1/2 text-white'>
                €
              </span>
              <Input
                className='h-12 border-0 bg-white/30 pl-8 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary'
                type='number'
                placeholder={tFilter('maxPlaceholder')}
                {...register('max_price', {})}
              />
            </div>
          </div>
          {(errors.min_price || errors.max_price) && (
            <p className='mt-2 text-sm text-red-400'>
              {errors.min_price?.message || errors.max_price?.message}
            </p>
          )}
        </div>

        {/* Date Range */}

        <div className='flex flex-col pr-2 md:basis-1/4'>
          <Label className='mb-2 block text-sm font-medium text-white/80'>
            {tFilter('dateRangeLabel')}
          </Label>
          <Controller
            name='date_range'
            control={control}
            render={({ field }) => (
              <DatePicker
                value={field.value}
                onChange={field.onChange}
                minDate={new Date()}
                format='DD-MM-YYYY'
                range
                className=''
                inputClass=' w-full md:w-[115%] text-center h-12 border-0 bg-white/30 cursor-pointer  text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary rounded-md'
              />
            )}
          />
        </div>

        {/* Search Button */}
        <Button
          type='submit'
          size='lg'
          className='h-12 md:ml-5 md:basis-1/4 md:mt-7   min-w-[140px] border-foreground/20 bg-slate-100 text-primary/90 transition-all hover:translate-y-[-2px] hover:bg-slate-200 hover:shadow-lg active:translate-y-0 sm:w-full lg:w-[40px]'
          disabled={!isDirty}
        >
          <Search className='mr-2 h-4 w-4 ' />
          {tFilter('searchButton')}
        </Button>
      </div>

      {/* Error messages container */}
      <div className='mt-2 min-h-[20px]'>
        {errors.min_price && errors.min_price.type === 'manual' && (
          <p className='text-sm text-red-400'>{errors.min_price.message}</p>
        )}
      </div>
    </form>
  );
};
