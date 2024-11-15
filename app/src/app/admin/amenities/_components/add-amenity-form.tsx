'use client';

import { createAmenityAction } from '@/actions/amenity.action';
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
import { toast } from '@/hooks/use-toast';
import { InsertAmenity } from '@packages/db/models/amenities';
import { useMutationAction } from '@packages/fetch-action/index';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { AMENITIES_QUERY_KEY } from '../static';

export const AddAmenityForm = () => {
  const queryClient = useQueryClient();
  const form = useForm<InsertAmenity>({
    defaultValues: {
      name: '',
    },
  });

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: AMENITIES_QUERY_KEY });
    form.reset();

    toast({
      title: 'Succès',
      description: "L'équipement a été ajouté avec succès",
    });
  };

  const onError = (error: Error) => {
    toast({
      variant: 'destructive',
      title: 'Erreur',
      description: error.message,
    });
  };

  const { mutateAsync, isPending } = useMutationAction(createAmenityAction, {
    onSuccess,
    onError,
  });

  const onSubmit = async (data: InsertAmenity) => {
    await mutateAsync(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom de l&apos;équipement</FormLabel>
              <FormControl>
                <Input placeholder='Ex: WiFi, Parking...' {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' disabled={isPending}>
          {isPending ? 'Ajout en cours...' : 'Ajouter'}
        </Button>
      </form>
    </Form>
  );
};
