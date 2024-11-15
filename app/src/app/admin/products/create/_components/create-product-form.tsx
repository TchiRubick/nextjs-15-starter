'use client';

import { getAllAmenitiesAction } from '@/actions/amenity.action';
import { createProductAction } from '@/actions/product.action';
import { AMENITIES_QUERY_KEY } from '@/app/admin/amenities/static';
import { MultiSelect } from '@/components/multi-select';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { CreateProduct } from '@/types';
import { useMutationAction } from '@packages/fetch-action/index';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { PRODUCTS_QUERY_KEY } from '../../static';

export const CreateProductForm = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: amenities } = useQuery({
    queryKey: AMENITIES_QUERY_KEY,
    queryFn: getAllAmenitiesAction,
  });

  const { mutateAsync, isPending } = useMutationAction(createProductAction, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });

      toast({
        title: 'Product created successfully',
      });

      router.push('/admin/products');
    },
    onError: () => {
      toast({
        title: 'Failed to create product',
      });
    },
  });

  const form = useForm<CreateProduct>({
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      room: 1,
      bed: 0,
      bath: 0,
      maxPerson: 0,
      status: 'draft',
    },
  });

  const onSubmit = async (data: CreateProduct) => {
    const selectAmenities = (data?.amenities ?? []).map(Number);
    await mutateAsync(data, selectAmenities);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='Product name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder='Product description' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='price'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  onFocus={(e) =>
                    e.target.value === '0' && (e.target.value = '')
                  }
                  type='number'
                  placeholder='0'
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='grid grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name='room'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rooms</FormLabel>
                <FormControl>
                  <Input
                    onFocus={(e) =>
                      e.target.value === '0' && (e.target.value = '')
                    }
                    type='number'
                    min={1}
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='bed'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Beds</FormLabel>
                <FormControl>
                  <Input
                    onFocus={(e) =>
                      e.target.value === '0' && (e.target.value = '')
                    }
                    type='number'
                    min={0}
                    value={field.value ?? ''}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='bath'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bathrooms</FormLabel>
                <FormControl>
                  <Input
                    onFocus={(e) =>
                      e.target.value === '0' && (e.target.value = '')
                    }
                    type='number'
                    min={0}
                    value={field.value ?? ''}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='maxPerson'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Persons</FormLabel>
                <FormControl>
                  <Input
                    onFocus={(e) =>
                      e.target.value === '0' && (e.target.value = '')
                    }
                    type='number'
                    min={0}
                    value={field.value ?? ''}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          name='amenities'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amenities</FormLabel>
              <FormControl>
                <MultiSelect
                  placeholder='Select amenities'
                  options={
                    amenities?.map((amenity) => ({
                      label: amenity.name,
                      value: String(amenity.id),
                    })) ?? []
                  }
                  onValueChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' disabled={isPending}>
          {isPending ? <Loader2 className='animate-spin' /> : 'Create Product'}
        </Button>
      </form>
    </Form>
  );
};
