import { Input } from '@/components/ui/input';
import { getOneProductAction } from '../../action';
import { Textarea } from '@/components/ui/textarea';

const EditProduct = async ({ params }: { params: Promise<{ id: number }> }) => {
  const { id } = await params;
  const product = await getOneProductAction(id);

  return (
    <div className='flex items-center py-4'>
      <div className='flex flex-col'>
        <h2 className='text-2xl font-bold'>Edit Product</h2>
        <Input name='name' defaultValue={product?.name} />
        <Textarea name='description' defaultValue={product?.description} />
        <Input
          name='price'
          type='number'
          defaultValue={product?.price}
          min={0}
        />
        <Input name='room' type='number' defaultValue={product?.room} />
        <p>
          amenities: {product?.amenities.map((amenity) => amenity.amenity.name)}
        </p>
      </div>
    </div>
  );
};

export default EditProduct;
