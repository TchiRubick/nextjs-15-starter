'use client';

import { DataTable } from '@/components/data-table';
import { ProductSelect } from '@packages/db/models/products';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';

import { getProductsQuery } from '@/actions/product.action';
import { Button } from '@/components/ui/button';
import { Edit2 } from 'lucide-react';
import Link from 'next/link';
import { PRODUCTS_QUERY_KEY } from '../static';

const columns: ColumnDef<ProductSelect>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Nom',
  },
  {
    accessorKey: 'price',
    header: 'Prix',
    cell: ({ row }) => (
      <div className='flex items-center gap-2'>
        <span>{row.getValue('price')}</span>
        <span className='text-gray-500'>€</span>
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <div className='flex items-center'>
        <span
          className={`rounded-full px-2 py-1 text-white ${
            row.getValue('status') === 'draft' ? 'bg-slate-500' : 'bg-green-500'
          }`}
        >
          {row.getValue('status')}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => (
      <div className='flex items-center'>
        <Link
          href={`/admin/products/edit/${row.original.id}`}
          className='text-blue-500 hover:underline'
        >
          <Button variant='ghost' className='flex items-center gap-1'>
            <Edit2 size={18} />
          </Button>
        </Link>
      </div>
    ),
  },
];

export const Table = () => {
  const { data, isFetching } = useQuery({
    queryKey: PRODUCTS_QUERY_KEY,
    queryFn: getProductsQuery,
  });

  return (
    <DataTable
      columns={columns}
      data={data ?? []}
      isLoading={isFetching}
      title='Products'
    />
  );
};
