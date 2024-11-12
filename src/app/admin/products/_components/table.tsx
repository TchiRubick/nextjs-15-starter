'use client';

import { DataTable } from '@/components/data-table';
import { ProductSelect } from '@packages/db/models/products';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { getAllProductsAction } from '../action';
import { PRODUCTS_QUERY_KEY } from '../static';

const columns: ColumnDef<ProductSelect>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
];

export const Table = () => {
  const { data, isFetching } = useQuery({
    queryKey: PRODUCTS_QUERY_KEY,
    queryFn: getAllProductsAction,
  });

  return (
    <DataTable columns={columns} data={data ?? []} isLoading={isFetching} />
  );
};
