import { adminGuard } from '@packages/auth/index';
import { AddAmenityForm } from './_components/add-amenity-form';
import { Table } from './_components/table';

export default async function AmenitiesPage() {
  await adminGuard();

  return (
    <div className='w-full px-2'>
      <div className='mt-4 flex gap-4'>
        <div className='w-full'>
          <Table />
        </div>
        <div className='w-1/3'>
          <AddAmenityForm />
        </div>
      </div>
    </div>
  );
}
