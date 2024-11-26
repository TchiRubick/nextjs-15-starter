'use client';

import {
  getProductQuery,
  scheduleProductMutation,
} from '@/actions/product.action';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { useSession } from '@/hooks/useSession';
import { useScopedI18n } from '@/locales/client';
import { useMutationAction } from '@packages/fetch-action/index';
import { eachDayOfInterval, format } from 'date-fns';
import { Calendar, EuroIcon, Loader2 } from 'lucide-react';
import { redirect } from 'next/navigation';
import qs from 'query-string';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import DatePicker, { DateObject } from 'react-multi-date-picker';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export const ScheduleForm = ({
  formValues,
  property,
}: {
  formValues: {
    check_in: Date;
    check_out: Date;
  };
  property: NonNullable<Awaited<ReturnType<typeof getProductQuery>>>;
}) => {
  const { data: session, isFetching } = useSession();

  const [isSheetOpen, setisSheetOpen] = useState(false);
  const tScheduleForm = useScopedI18n('scheduleForm');

  const formDefaultValue = {
    date_range: [
      new DateObject(formValues.check_in),
      new DateObject(formValues.check_out),
    ] as [DateObject, DateObject],
  };

  const { mutateAsync, error, isPending } = useMutationAction(
    scheduleProductMutation,
    {
      onSuccess() {
        setisSheetOpen(false);
        toast({
          title: tScheduleForm('confirmMessage'),
        });
      },

      onError: () => {
        toast({
          variant: 'destructive',
          title: tScheduleForm('failedMessage'),
          description: error?.message,
        });
      },
    }
  );

  const { control, handleSubmit, watch } = useForm({
    defaultValues: formDefaultValue,
  });

  const dateRange = watch('date_range', formDefaultValue.date_range);

  const onSubmit = async (data: { date_range: [DateObject, DateObject] }) => {
    const startDate = data.date_range[0].format('YYYY-MM-DD');
    const endDate = data.date_range[1].format('YYYY-MM-DD');

    await mutateAsync(property.id, new Date(startDate), new Date(endDate));
  };

  const handleOpenChange = (open: boolean) => {
    if (!session) {
      redirect(
        `/auth?callbackUrl=/properties/${property.id}?${qs.stringify({
          check_in: format(formValues.check_in, 'yyyy-MM-dd'),
          check_out: format(formValues.check_out, 'yyyy-MM-dd'),
        })}`
      );
    }

    setisSheetOpen(open);
  };

  const totalPrice = useMemo(() => {
    const [start, end] = dateRange;
    const startDate = new Date(start.format('YYYY-MM-DD'));
    const endDate = new Date((end ?? start).format('YYYY-MM-DD'));

    const intervals = eachDayOfInterval({ start: startDate, end: endDate });

    return property.price * intervals.length;
  }, [dateRange, property.price]);

  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  const handleDateChange = (dates: DateObject[]) => {
    if (
      Array.isArray(dates) &&
      dates.length === 2 &&
      dates[0].dayOfYear != dates[1].dayOfYear
    ) {
      setIsSaveDisabled(false);
    } else {
      setIsSaveDisabled(true);
    }
  };

  return (
    <div>
      <Sheet onOpenChange={handleOpenChange} open={isSheetOpen}>
        <SheetTrigger asChild>
          <Button className='w-full' size='lg' disabled={isFetching}>
            <Calendar className='mr-2 h-4 w-4' />
            {tScheduleForm('bookButton')}
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{tScheduleForm('drawerTitle')}</SheetTitle>
            <SheetDescription>
              {tScheduleForm('drawerDescription')}
            </SheetDescription>
          </SheetHeader>
          <div className='py-4'>
            <h3 className='text-lg font-semibold'>{tScheduleForm('recap')}</h3>
            <div className='flex flex-row items-center gap-2'>
              <Label className='text-right'>{tScheduleForm('number')}:</Label>
              <span className='text-sm font-semibold'>{property.id}</span>
            </div>
            <div className='flex flex-row items-center gap-2'>
              <Label className='text-right'>{tScheduleForm('name')}:</Label>
              <span className='text-sm font-semibold'>{property.name}</span>
            </div>
            <div className='flex flex-row items-center gap-2'>
              <Label>{tScheduleForm('ttc')}:</Label>
              <span className='flex items-center text-sm font-semibold'>
                {totalPrice} <EuroIcon className='h-4 w-4' />
              </span>
            </div>
          </div>
          <div className='flex flex-col gap-y-2'>
            <Label htmlFor='date'>{tScheduleForm('dateRangeLabel')}</Label>
            <Controller
              name='date_range'
              control={control}
              render={({ field }) => (
                <DatePicker
                  value={field.value}
                  onChange={(dates) => {
                    handleDateChange(dates);
                  }}
                  range
                  format='DD-MM-YYYY'
                  minDate={new Date()}
                  className={isSaveDisabled ? 'red' : 'green'}
                  inputClass={
                    isSaveDisabled
                      ? 'w-full text-emerald-950 h-12 w-full border-2 cursor-pointer pl-8 placeholder:text-slate-500 focus:ring-2 focus:ring-primary rounded-md border-red-500'
                      : 'w-full text-emerald-950 h-12 w-full border-2 cursor-pointer pl-8 placeholder:text-slate-500 focus:ring-2 focus:ring-primary rounded-md'
                  }
                />
              )}
            />
          </div>
          <SheetFooter className='mt-3 flex flex-col'>
            <Button
              type='submit'
              onClick={handleSubmit(onSubmit)}
              disabled={isPending || isSaveDisabled}
              className='w-full'
            >
              {isPending ? (
                <Loader2 className='animated-spin' />
              ) : (
                tScheduleForm('saveButton')
              )}
            </Button>
          </SheetFooter>
          <SheetClose asChild className='mt-3'>
            <Button variant='outline' className='w-full'>
              {tScheduleForm('cancelButton')}
            </Button>
          </SheetClose>
        </SheetContent>
      </Sheet>
    </div>
  );
};
