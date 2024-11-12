'use client';

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
import { zodResolver } from '@hookform/resolvers/zod';
import { InsertAmenity, zInsertAmenity } from '@packages/db/models/amenities';
import { useForm } from 'react-hook-form';
import { useCreateAmenity } from '../hooks/useCreateAmenity';

export const AddAmenityForm = () => {
  const form = useForm<InsertAmenity>({
    resolver: zodResolver(zInsertAmenity),
    defaultValues: {
      name: '',
    },
  });

  const onSuccess = () => {
    form.reset();

    toast({
      title: 'Succès',
      description: 'L\'équipement a été ajouté avec succès',
    });
  }

  const onError = (error: Error) => {
    toast({
      variant: 'destructive',
      title: 'Erreur',
      description: error.message,
    });
  }

  const { mutate, isPending } = useCreateAmenity(
    onSuccess,
    onError
  );

  const onSubmit = (data: InsertAmenity) => {
    mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom de l'équipement</FormLabel>
              <FormControl>
                <Input placeholder="Ex: WiFi, Parking..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Ajout en cours...' : 'Ajouter'}
        </Button>
      </form>
    </Form>
  );
};
