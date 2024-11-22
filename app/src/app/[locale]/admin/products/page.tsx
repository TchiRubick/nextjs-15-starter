import { Button } from '@/components/ui/button';
import { adminGuard } from '@packages/auth/index';
import Link from 'next/link';
import { Table } from './_components/table';

export default async function AdminPage() {
  await adminGuard();

  return (
    <div className='w-full px-2'>
      <div className='flex items-center justify-end py-4'>
        <Link href='/admin/products/create' prefetch>
          <Button className='bg-slate-100 text-slate-900 hover:bg-slate-200 hover:text-slate-900'>
            Create Product
          </Button>
        </Link>
      </div>
      <Table />
    </div>
  );
}
