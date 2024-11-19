'use client';

import { scheduleProductMutation } from '@/actions/product.action';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useMutationAction } from '@packages/fetch-action/index';

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
  const formDefaultValue = {
    date_range: [
      new DateObject(formValues.check_in),
      new DateObject(formValues.check_out),
    ] as [DateObject, DateObject],
  };

  const { mutateAsync, error, isError } = useMutationAction(
    scheduleProductMutation
  );

  const { control, handleSubmit } = useForm({
    defaultValues: formDefaultValue,
  });

  const onSubmit = async (data: { date_range: [DateObject, DateObject] }) => {
    const startDate = data.date_range[0].format('YYYY-MM-DD');
    const endDate = data.date_range[1].format('YYYY-MM-DD');

    await mutateAsync(id, new Date(startDate), new Date(endDate));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <Button>Valider</Button>
    </form>
  );
};
