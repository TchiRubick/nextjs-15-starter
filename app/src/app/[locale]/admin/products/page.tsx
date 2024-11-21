import { Button } from '@/components/ui/button';
import { adminGuard } from '@packages/auth/index';
import Link from 'next/link';
import { Table } from './_components/table';

export default async function AdminPage() {
  await adminGuard();

  return (
    <div>
      <div className='flex items-center justify-between py-4'>
        <h2 className='text-2xl font-bold text-slate-100'>Products</h2>
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
