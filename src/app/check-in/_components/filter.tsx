'use client';

import { Controller, useForm } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { addDays } from 'date-fns';
import { DatePickerWithRange } from './Date-Picker-With-Range';
import { DateRange } from 'react-day-picker';

interface ValuesData {
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
      min_price: 10,
      max_price: 20,
      date_range: {
        from: new Date(),
        to: addDays(new Date(), 1),
      },
    },
  });

  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: addDays(new Date(), 1),
  });

  const onSubmit = (data: ValuesData) => {
    if (Number(data.min_price) > Number(data.max_price)) {
      setError('min_price', {
        type: 'manual',
        message: 'Minimum price cannot be greater than maximum price.',
      });
      return;
    }
    console.log(data);
  };

  const handleDateRangeChange = (range: { from: Date; to: Date }) => {
    setDateRange(range);
    setValue('date_range', range);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex h-fit space-x-3 pt-12'
    >
      <div>
        <Label>
          Min Price
          <Input
            id='min_price'
            type='number'
            {...register('min_price', {
              required: 'Min price is required',
              min: 0,
            })}
          />
          {errors.min_price && (
            <Label className='text-red-500'>{errors.min_price.message}</Label>
          )}
        </Label>
      </div>
      <div>
        <Label>
          Max Price
          <Input
            type='number'
            {...register('max_price', {
              required: 'Max price is required',
              min: 0,
            })}
          />
        </Label>
        {errors.max_price && (
          <Label className='text-red-500'>{errors.max_price.message}</Label>
        )}
      </div>
      <div>
        <Label>
          Check-in and Check-out
          <Controller
            name='date_range'
            control={control}
            render={({ field }) => (
              <DatePickerWithRange
                value={dateRange}
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
