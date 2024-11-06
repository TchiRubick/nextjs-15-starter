'use client';

import { Controller, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSearchParamState } from '@/hooks/useSearchParamState';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { z } from 'zod';
import {
  defaultFilterParamValidation,
  filterParamValidation,
} from '../_validations';
import { DateRangePicker } from './date-range-picker';

const filterSchema = z.object({
  min_price: z.coerce.number(),
  max_price: z.coerce.number(),
  date_range: z.object({
    from: z.date(),
    to: z.date(),
  }),
});

type FilterSchema = z.infer<typeof filterSchema>;

export const Filter = () => {
  const [params, setParams] = useSearchParamState(
    filterParamValidation,
    defaultFilterParamValidation
  );

  console.log(params);
  const {
    register,
    handleSubmit,
    control,
    setError,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      min_price: params.min_price,
      max_price: params.max_price,
      date_range: {
        from: new Date(params.check_in),
        to: new Date(params.check_out),
      },
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
      check_in: format(data.date_range.from, 'yyyy-MM-dd'),
      check_out: format(data.date_range.to, 'yyyy-MM-dd'),
    });
  };

  const handleDateRangeChange = (range: { from: Date; to: Date }) => {
    setValue('date_range', range);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex h-fit space-x-3'>
      <div>
        <Label>
          Prix minimum
          <Input
            id='min_price'
            type='number'
            {...register('min_price', {
              required: 'Min price is required',
              min: 0,
            })}
          />
          {errors.min_price && (
            <Label className='absolute text-red-500'>
              {errors.min_price.message}
            </Label>
          )}
        </Label>
      </div>
      <div>
        <Label>
          Prix maximum
          <Input
            type='number'
            {...register('max_price', {
              required: 'Max price is required',
              min: 0,
            })}
          />
        </Label>
        {errors.max_price && (
          <Label className='absolute text-red-500'>
            {errors.max_price.message}
          </Label>
        )}
      </div>
      <div>
        <Label>
          Date d&apos;arrivée - Date de départ
          <Controller
            name='date_range'
            control={control}
            render={({ field }) => (
              <DateRangePicker
                value={field.value}
                onDateRangeChange={
                  handleDateRangeChange as (
                    value: DateRange | undefined
                  ) => void
                }
              />
            )}
          />
        </Label>
      </div>
      <div className='flex items-end'>
        <Button type='submit'>Recherche</Button>
      </div>
    </form>
  );
};
