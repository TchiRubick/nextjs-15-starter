'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSearchParamState } from '@/hooks/useSearchParamState';
import { zodResolver } from '@hookform/resolvers/zod';
import { Search } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import 'react-multi-date-picker/styles/layouts/mobile.css';
import { z } from 'zod';
import {
  defaultPropertyFilterParam,
  filterParamValidation,
} from '../_validations';

const filterSchema = z.object({
  min_price: z.coerce.number(),
  max_price: z.coerce.number(),
  date_range: z.tuple([z.instanceof(DateObject), z.instanceof(DateObject)]),
});

type FilterSchema = z.infer<typeof filterSchema>;

export const Filter = ({ reload }: { reload?: boolean }) => {
  const [params, setParams] = useSearchParamState(
    filterParamValidation,
    defaultPropertyFilterParam,
    {
      reload,
      customPathname: '/#properties',
      scroll: false,
    }
  );

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      min_price: params.min_price,
      max_price: params.max_price,
      date_range: [
        new DateObject(params.check_in),
        new DateObject(params.check_out),
      ] as [DateObject, DateObject],
    },
    mode: 'onChange',
    resolver: zodResolver(filterSchema),
  });

  const onSubmit = (data: FilterSchema) => {
    if (Number(data.min_price) > Number(data.max_price)) {
      setError('min_price', {
        type: 'manual',
        message: 'Le prix minimum ne peut pas être supérieur au prix maximum.',
      });
      return;
    }

    setParams({
      min_price: data.min_price,
      max_price: data.max_price,
      check_in: data.date_range[0].format('YYYY-MM-DD'),
      check_out: data.date_range[1].format('YYYY-MM-DD'),
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='mx-auto w-full max-w-6xl rounded-xl bg-slate-900 p-6 shadow-xl'
    >
      <div className='flex flex-wrap items-end gap-6'>
        {/* Price Range */}
        <div className='min-w-[200px] flex-1'>
          <Label className='mb-2 block text-sm font-medium text-white/80'>
            Prix par nuit
          </Label>
          <div className='flex gap-3'>
            <div className='relative flex-1'>
              <span className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400'>
                €
              </span>
              <Input
                id='min_price'
                className='h-12 border-0 bg-white/10 pl-8 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary'
                type='number'
                placeholder='Min'
                {...register('min_price', {
                  required: 'Prix minimum requis',
                  min: 0,
                })}
              />
            </div>
            <div className='relative flex-1'>
              <span className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400'>
                €
              </span>
              <Input
                className='h-12 border-0 bg-white/10 pl-8 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary'
                type='number'
                placeholder='Max'
                {...register('max_price', {
                  required: 'Prix maximum requis',
                  min: 0,
                })}
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
        <div className='min-w-[300px] flex-[2]'>
          <Label className='mb-2 block text-sm font-medium text-white/80'>
            Dates du séjour
          </Label>
          <Controller
            name='date_range'
            control={control}
            render={({ field }) => (
              <DatePicker
                value={field.value}
                onChange={field.onChange}
                range
                className='green rmdp-mobile'
                inputClass='h-12 border-0 bg-white/10 pl-8 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary rounded-md'
              />
            )}
          />
        </div>

        {/* Search Button */}
        <Button
          type='submit'
          size='lg'
          className='h-12 w-full min-w-[140px] bg-white font-medium text-slate-900 transition-all hover:translate-y-[-2px] hover:bg-slate-50 hover:shadow-lg active:translate-y-0 sm:w-full lg:w-[48px]'
        >
          <Search className='mr-2 h-4 w-4' />
          Rechercher
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
