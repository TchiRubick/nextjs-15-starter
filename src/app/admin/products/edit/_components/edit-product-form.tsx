'use client';

import { MultiSelect } from '@/components/multi-select';
import { AMENITIES_QUERY_KEY } from '@/app/admin/amenities/static';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useQuery } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { getAmenitiesAction } from '../../create/action';
import { useMutationAction } from '@packages/fetch-action/index';
import { updateProductAction } from '../../action';
import { toast } from '@/hooks/use-toast';
import { UpdateProduct } from '@packages/db/models/products';
import { Loader2 } from 'lucide-react';
import { redirect } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Props {
  product: {
    name: string;
    description: string;
    price: number;
    room: number;
    bed: number;
    bath: number;
    maxPerson: number;
    status: 'draft' | 'published';
    amenities: string[];
  };
}

export const EditProductForm = ({ product }: Props) => {
  const { register, handleSubmit, control } = useForm<Props['product']>({
    defaultValues: product,
  });

  const { data: amenities } = useQuery({
    queryKey: AMENITIES_QUERY_KEY,
    queryFn: getAmenitiesAction,
  });

  const { mutateAsync, isPending } = useMutationAction(updateProductAction, {
    onSuccess: () => {
      toast({
        title: 'Product updated successfully',
      });
    },
    onError: () => {
      toast({
        title: 'Failed to update product',
      });
    },
  });

  const onSubmit = async (data: UpdateProduct) => {
    const updatedData = { ...data, amenities: [] };
    await mutateAsync(data.id ?? 6, updatedData);
    redirect('/admin/products');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register('name')} type='text' />
      <Textarea {...register('description')} />
      <Input {...register('price')} type='number' />
      <Input {...register('room')} type='number' />
      <Input {...register('bed')} type='number' />
      <Input {...register('bath')} type='number' />
      <Input {...register('maxPerson')} type='number' />

      <Controller
        name='status'
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='draft'>Draft</SelectItem>
              <SelectItem value='published'>Published</SelectItem>
            </SelectContent>
          </Select>
        )}
      />

      <Controller
        name='amenities'
        control={control}
        render={({ field }) => (
          <MultiSelect
            name='amenities'
            value={field.value}
            defaultValue={field.value}
            options={
              amenities?.map((amenity) => ({
                label: amenity.name,
                value: String(amenity.id),
              })) ?? []
            }
            onValueChange={field.onChange}
          />
        )}
      />

      <Button type='submit' disabled={isPending}>
        {isPending ? <Loader2 className='animated-spin' /> : 'Submit'}
      </Button>
    </form>
  );
};
