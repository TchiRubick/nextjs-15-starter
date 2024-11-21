'use client';

import { scheduleProductMutation } from '@/actions/product.action';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Label } from '@/components/ui/label';
import { useSession } from '@/hooks/useSession';
import { useMutationAction } from '@packages/fetch-action/index';
import { format } from 'date-fns';
import { Calendar, Loader2 } from 'lucide-react';
import { redirect } from 'next/navigation';
import qs from 'query-string';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import DatePicker, { DateObject } from 'react-multi-date-picker';

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

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const formDefaultValue = {
    date_range: [
      new DateObject(formValues.check_in),
      new DateObject(formValues.check_out),
    ] as [DateObject, DateObject],
  };

  const { mutateAsync, error, isError, isPending } = useMutationAction(
    scheduleProductMutation,
    {
      onSuccess() {
        setIsDrawerOpen(false);
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

    setIsDrawerOpen(open);
  };

  return (
    <div>
      <Drawer
        onOpenChange={handleOpenChange}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <DrawerTrigger asChild>
          <Button className='w-full' size='lg' disabled={isFetching}>
            <Calendar className='mr-2 h-4 w-4' />
            Book
          </Button>
        </DrawerTrigger>

        <DrawerContent>
          <div className='mx-auto w-full max-w-sm'>
            <DrawerHeader>
              <DrawerTitle>Book</DrawerTitle>
              <DrawerDescription>Book ton sejour</DrawerDescription>
            </DrawerHeader>
            <div>
              <Label className='mb-2 block text-sm font-medium text-emerald-950'>
                Dates de votre séjour
              </Label>
              <Controller
                name='date_range'
                control={control}
                render={({ field }) => (
                  <DatePicker
                    value={field.value}
                    onChange={field.onChange}
                    range
                    className='green'
                    minDate={new Date()}
                    inputClass='text-emerald-950 h-12 border-2 cursor-pointer pl-8 placeholder:text-slate-500 focus:ring-2 focus:ring-primary rounded-md'
                  />
                )}
              />
              <p>{isError && error?.message}</p>
            </div>
            <DrawerFooter>
              <Button
                type='submit'
                onClick={handleSubmit(onSubmit)}
                disabled={isPending}
              >
                {isPending ? (
                  <Loader2 className='animated-spin' />
                ) : (
                  'Enregistrer'
                )}
              </Button>
              <DrawerClose asChild>
                <Button variant='outline'>Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
