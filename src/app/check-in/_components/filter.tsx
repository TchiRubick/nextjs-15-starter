'use client';

import { Controller, useForm } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useQueryState } from 'nuqs';
import { addDays } from 'date-fns';
import { DatePickerWithRange } from './Date-Picker-With-Range';
import { DateRange } from 'react-day-picker';
import { useRouter } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import qs from 'querystring';

interface DataFilterType {
  min_price: number;
  max_price: number;
  date_range: {
    from: Date;
    to: Date;
  };
}

export const Filter = () => {
  const {
    register,
    handleSubmit,
    control,
    setError,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      min_price: 0,
      max_price: 0,
      date_range: {
        from: new Date(),
        to: addDays(new Date(), 1),
      },
    },
    mode: 'onChange',
  });

  const router = useRouter();

  // const [, setQuery] = useQueryState('min_price');
  // const [, setMaxPrice] = useQueryState('max_price');
  // const [, setFrom] = useQueryState('from');
  // const [, setTo] = useQueryState('to');

  const handSelectedDateRange = (dateRange: DateRange | undefined) => {
    if (dateRange) {
      // setFrom(dateRange.from ? dateRange.from.toLocaleDateString() : '');
      // setTo(dateRange.to ? dateRange.to.toLocaleDateString() : '');
    }
  };

  const onSubmit = (data: DataFilterType) => {
    if (Number(data.min_price) > Number(data.max_price)) {
      setError('min_price', {
        type: 'manual',
        message: 'Le prix minimum ne peut pas être supérieur au prix maximum.',
      });
      return;
    }

    const params = qs.stringify({
      min_price: data.min_price,
      max_price: data.max_price,
      check_in: data.date_range.from.toLocaleDateString(),
      check_out: data.date_range.to.toLocaleDateString(),
    });

    router.push(`/check-in?${params}`);
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
          Date d'arrivée - Date de départ
          <Controller
            name='date_range'
            control={control}
            render={({ field }) => (
              <DatePickerWithRange
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
