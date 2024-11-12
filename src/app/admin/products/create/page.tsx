import { adminGuard } from '@packages/auth/index';
import { CreateProductForm } from './_components/create-product-form';

export default async function AdminPage() {
  await adminGuard();

  return (
    <div>
      <div className='flex justify-between items-center py-4'>
        <h2 className='text-2xl font-bold'>Create Product</h2>
      </div>
      <CreateProductForm />
    </div>
  );
}
