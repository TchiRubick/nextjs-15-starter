'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSearchParamState } from '@/hooks/useSearchParamState';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import qs from 'query-string';
import { useEffect } from 'react';
import { DateRange } from 'react-day-picker';
import { Controller, useForm } from 'react-hook-form';
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

export const Filter = ({ reload }: { reload?: boolean }) => {
  const [params, setParams] = useSearchParamState(
    filterParamValidation,
    defaultFilterParamValidation,
    {
      reload,
      customPathname: '/check-in',
      scroll: true,
    }
  );

  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    setError,
    setValue,
    watch,
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

  const values = watch();

  useEffect(() => {
    console.log('prefetch');
    router.prefetch(
      `/check-in?${qs.stringify({
        min_price: values.min_price,
        max_price: values.max_price,
        check_in: format(values.date_range.from, 'yyyy-MM-dd'),
        check_out: format(values.date_range.to, 'yyyy-MM-dd'),
      })}`
    );
  }, [values]);

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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto w-full max-w-6xl rounded-xl bg-slate-900 p-6 shadow-xl"
    >
      <div className="flex flex-wrap items-end gap-6">
        {/* Price Range */}
        <div className="flex-1 min-w-[200px]">
          <Label className="mb-2 block text-sm font-medium text-white/80">
            Prix par nuit
          </Label>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                €
              </span>
              <Input
                id="min_price"
                className="h-12 border-0 bg-white/10 pl-8 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary"
                type="number"
                placeholder="Min"
                {...register('min_price', {
                  required: 'Prix minimum requis',
                  min: 0,
                })}
              />
            </div>
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                €
              </span>
              <Input
                className="h-12 border-0 bg-white/10 pl-8 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary"
                type="number"
                placeholder="Max"
                {...register('max_price', {
                  required: 'Prix maximum requis',
                  min: 0,
                })}
              />
            </div>
          </div>
          {(errors.min_price || errors.max_price) && (
            <p className="mt-2 text-sm text-red-400">
              {errors.min_price?.message || errors.max_price?.message}
            </p>
          )}
        </div>

        {/* Date Range */}
        <div className="flex-[2] min-w-[300px]">
          <Label className="mb-2 block text-sm font-medium text-white/80">
            Dates du séjour
          </Label>
          <Controller
            name="date_range"
            control={control}
            render={({ field }) => (
              <DateRangePicker
                className="h-12 w-full rounded-md border-0 bg-white/10 text-white focus:ring-2 focus:ring-primary"
                value={field.value}
                onDateRangeChange={
                  handleDateRangeChange as (value: DateRange | undefined) => void
                }
              />
            )}
          />
        </div>

        {/* Search Button */}
        <Button
          type="submit"
          size="lg"
          className="h-12 min-w-[140px] bg-primary font-medium text-white transition-all hover:bg-primary/90 hover:shadow-lg"
        >
          <Search className="mr-2 h-4 w-4" />
          Rechercher
        </Button>
      </div>

      {/* Error messages container */}
      <div className="mt-2 min-h-[20px]">
        {errors.min_price && errors.min_price.type === 'manual' && (
          <p className="text-sm text-red-400">{errors.min_price.message}</p>
        )}
      </div>
    </form>
  );
};
