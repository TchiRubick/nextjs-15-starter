import { Button } from '@/components/ui/button';
import { adminGuard } from '@packages/auth/index';
import Link from 'next/link';
import { Table } from './_components/table';

export default async function AdminPage() {
  await adminGuard();

  return (
    <div>
      <div className='flex justify-between items-center py-4'>
        <h2 className='text-2xl font-bold'>Products</h2>
        <Link href='/admin/products/create' prefetch>
          <Button>Create Product</Button>
        </Link>
      </div>
      <Table />
    </div>
  );
}
