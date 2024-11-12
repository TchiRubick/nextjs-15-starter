'use client';

import { DataTable } from '@/components/data-table';
import { AmenitySelect } from '@packages/db/models/amenities';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { getAllAmenitiesAction } from '../action';
import { AMENITIES_QUERY_KEY } from '../static';
import { Button } from '@/components/ui/button';
import { Loader2, Trash2 } from 'lucide-react';
import { useMutationAction } from '@packages/fetch-action/index';
import { deleteAmenityAction } from '../action';
import { useQueryClient } from '@tanstack/react-query';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { DialogTrigger } from '@radix-ui/react-dialog';

const columns: ColumnDef<AmenitySelect>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => {
      const { mutateAsync, isPending } = useMutationAction(deleteAmenityAction);
      const queryClient = useQueryClient();

      const onRemove = async (id: number) => {
        await mutateAsync(id);
        await queryClient.invalidateQueries({ queryKey: AMENITIES_QUERY_KEY });
      };
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant='ghost'
              className='z-50 bg-none'
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className='animated-spin' />
              ) : (
                <Trash2 className='h-4 w-4' color='red' />
              )}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete this
                amenity.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button>Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button onClick={() => onRemove(row.original.id)}>
                  Confirm
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    },
  },
];

export const Table = () => {
  const { data, isFetching } = useQuery({
    queryKey: AMENITIES_QUERY_KEY,
    queryFn: getAllAmenitiesAction,
  });

  return (
    <DataTable columns={columns} data={data ?? []} isLoading={isFetching} />
  );
};
