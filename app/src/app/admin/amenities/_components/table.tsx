'use client';

import {
  deleteAmenityAction,
  getAllAmenitiesAction,
} from '@/actions/amenity.action';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { AmenitySelect } from '@packages/db/models/amenities';
import { useMutationAction } from '@packages/fetch-action/index';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { Loader2, Trash2 } from 'lucide-react';
import { AMENITIES_QUERY_KEY } from '../static';

const columns = (
  onRemove: (id: number) => void,
  isPending?: boolean
): ColumnDef<AmenitySelect>[] => [
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
    cell: ({ row }) => (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='ghost' className='z-50 bg-none' disabled={isPending}>
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
              <Button variant='destructive'>Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button onClick={() => onRemove(row.original.id)}>Confirm</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ),
  },
];

export const Table = () => {
  const queryClient = useQueryClient();

  const { data, isFetching } = useQuery({
    queryKey: AMENITIES_QUERY_KEY,
    queryFn: getAllAmenitiesAction,
  });

  const { mutateAsync, isPending } = useMutationAction(deleteAmenityAction);

  const onRemove = async (id: number) => {
    await mutateAsync(id);
    await queryClient.invalidateQueries({ queryKey: AMENITIES_QUERY_KEY });
  };

  return (
    <DataTable
      columns={columns(onRemove, isPending)}
      data={data ?? []}
      isLoading={isFetching}
    />
  );
};
