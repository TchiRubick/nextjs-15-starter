import { adminGuard } from '@packages/auth/index';
import { Table } from './_components/table';

export default async function AdminPage() {
  await adminGuard();

  return (
    <div>
      <h2 className='text-2xl font-bold'>Products</h2>
      <Table />
    </div>
  );
}
