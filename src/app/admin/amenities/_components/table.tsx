'use client';

import { DataTable } from '@/components/data-table';
import { AmenitySelect } from '@packages/db/models/amenities';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { getAllAmenitiesAction } from '../action';
import { AMENITIES_QUERY_KEY } from '../static';
const columns: ColumnDef<AmenitySelect>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Name',
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
