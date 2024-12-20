import { adminGuard } from '@packages/auth/index';
import { CreateProductForm } from './_components/create-product-form';

export default async function AdminPage() {
  await adminGuard();

  return (
    <div className='w-full px-2'>
      <CreateProductForm />
    </div>
  );
}
