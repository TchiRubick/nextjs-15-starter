'use client';

import { scheduleProductMutation } from '@/actions/product.action';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useSession } from '@/hooks/useSession';
import { useMutationAction } from '@packages/fetch-action/index';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Calendar, Loader2 } from 'lucide-react';
import { redirect } from 'next/navigation';
import qs from 'query-string';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import { useScopedI18n } from '@/locales/client';

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
  id,
}: {
  formValues: {
    check_in: Date;
    check_out: Date;
  };
  id: number;
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
          title: 'date de séjour modifier avec succès',
        });
      },

      onError: () => {
        toast({
          variant: 'destructive',
          title: 'modification à échouer',
          description: error?.message,
        });
      },
    }
  );

  const { control, handleSubmit } = useForm({
    defaultValues: formDefaultValue,
  });

  const onSubmit = async (data: { date_range: [DateObject, DateObject] }) => {
    const startDate = data.date_range[0].format('YYYY-MM-DD');
    const endDate = data.date_range[1].format('YYYY-MM-DD');

    await mutateAsync(id, new Date(startDate), new Date(endDate));
  };

  const handleOpenChange = (open: boolean) => {
    if (!session) {
      redirect(
        `/auth?callbackUrl=/properties/${id}?${qs.stringify({
          check_in: format(formValues.check_in, 'yyyy-MM-dd'),
          check_out: format(formValues.check_out, 'yyyy-MM-dd'),
        })}`
      );
    }

    setisSheetOpen(open);
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
          <div className='flex flex-row items-center'>
            <Label htmlFor='nom' className='text-right'>
              Nom:
            </Label>
            <h1 className='font-bold'>Chalet</h1>
          </div>
          <div>
            <Label htmlFor='prixtotal'>Prix total de vos séjour:</Label>
            <h1>150 EUR</h1>
          </div>
          <div className='flex flex-col gap-y-2'>
            <Label htmlFor='date'>{tScheduleForm('dateRangeLabel')}</Label>
            <Controller
              name='date_range'
              control={control}
              render={({ field }) => (
                <DatePicker
                  value={field.value}
                  onChange={field.onChange}
                  range
                  className=''
                  minDate={new Date()}
                  inputClass=' w-full  text-emerald-950 h-12 w-full  border-2 cursor-pointer pl-8 placeholder:text-slate-500 focus:ring-2 focus:ring-primary rounded-md'
                />
              )}
            />
          </div>

          <SheetFooter className='mt-3 flex flex-col'>
            <Button
              type='submit'
              onClick={handleSubmit(onSubmit)}
              disabled={isPending}
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
