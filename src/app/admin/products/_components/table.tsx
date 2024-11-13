'use client';

import { DataTable } from '@/components/data-table';
import { ProductSelect } from '@packages/db/models/products';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { getAllProductsAction } from '../action';
import { PRODUCTS_QUERY_KEY } from '../static';
import Link from 'next/link';
import { Edit2 } from 'lucide-react';

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
    cell: ({ row }) => (
      <div className='flex items-center gap-2'>
        <span>{row.getValue('price')}</span>
        <span className='text-gray-500'>$</span>
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => (
      <div className='flex items-center gap-2'>
        <Link
          href={`/admin/products/edit/${row.original.id}`}
          className='text-blue-500 hover:underline'
        >
          <Edit2 size={18} />
        </Link>
      </div>
    ),
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
