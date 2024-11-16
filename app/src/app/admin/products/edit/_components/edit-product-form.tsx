'use client';

import { getAmenitiesQuery } from '@/actions/amenity.action';
import { updateProductAdminMutation } from '@/actions/product.action';
import { AMENITIES_QUERY_KEY } from '@/app/admin/amenities/static';
import { MultiSelect } from '@/components/multi-select';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { EditProduct } from '@/types';
import { useMutationAction } from '@packages/fetch-action/index';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { PRODUCTS_QUERY_KEY } from '../../static';

interface Props {
  productId: number;
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

export const EditProductForm = ({ product, productId }: Props) => {
  const { register, handleSubmit, control } = useForm<Props['product']>({
    defaultValues: product,
  });

  const queryClient = useQueryClient();

  const { data: amenities } = useQuery({
    queryKey: AMENITIES_QUERY_KEY,
    queryFn: getAmenitiesQuery,
  });

  const { mutateAsync, isPending, error } = useMutationAction(
    updateProductAdminMutation,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });

        toast({
          title: 'Product updated successfully',
        });
      },
      onError: () => {
        toast({
          variant: 'destructive',
          title: 'Failed to update product',
          description: error?.message,
        });
      },
    }
  );

  const onSubmit = async (data: EditProduct) => {
    const updatedData = {
      ...data,
      amenities: (data?.amenities ?? []).map(Number),
    };

    await mutateAsync(productId, updatedData);

    redirect('/admin/products');
  };

  return (
    <div>
      <Link
        prefetch
        href='/admin/products'
        className='fixed left-4 top-24 flex gap-2 hover:animate-bounce hover:gap-3'
      >
        <ArrowLeft /> Retour
      </Link>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className='w-full border-none'>
          <CardHeader>
            <CardTitle className='text-2xl'>Détails du produit</CardTitle>
          </CardHeader>
          <CardContent>
            <Label className='flex flex-col gap-2 text-base'>
              Nom du chalet
              <Input {...register('name')} type='text' />
            </Label>
            <div className='mt-4 flex flex-col gap-5 md:grid md:grid-cols-5'>
              <Label className='flex flex-col gap-2 text-base'>
                Pix
                <Input {...register('price')} type='number' />
              </Label>
              <Label className='flex flex-col gap-2 text-base'>
                Chambre
                <Input {...register('room')} type='number' />
              </Label>
              <Label className='flex flex-col gap-2 text-base'>
                Lit
                <Input {...register('bed')} type='number' />
              </Label>
              <Label className='flex flex-col gap-2 text-base'>
                Salle de bain
                <Input {...register('bath')} type='number' />
              </Label>
              <Label className='flex flex-col gap-2 text-base'>
                Nombre de personnes maximum
                <Input {...register('maxPerson')} type='number' />
              </Label>
            </div>
            <Label className='mt-4 flex flex-col gap-2 text-base'>
              Description
              <Textarea
                {...register('description')}
                className='min-h-40 w-full'
              />
            </Label>
            <div className='mt-4 grid grid-cols-2 gap-5'>
              <div>
                <Label className='flex w-full flex-col gap-2 text-base'>
                  Status
                  <Controller
                    name='status'
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
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
                </Label>
              </div>
              <div>
                <Label className='flex flex-col gap-2 text-base'>
                  Équipements
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
                </Label>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type='submit' disabled={isPending}>
              {isPending ? (
                <Loader2 className='animated-spin' />
              ) : (
                'Enregistrer'
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};
