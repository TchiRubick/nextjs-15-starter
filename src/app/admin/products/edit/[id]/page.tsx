import { getOneProductAction } from '../../action';

const EditProduct = async ({ params }: { params: Promise<{ id: number }> }) => {
  const { id } = await params;
  const product = await getOneProductAction(id);

  return (
    <div className='flex items-center py-4'>
      <div className='flex flex-col'>
        <h2 className='text-2xl font-bold'>Edit Product</h2>
        <p>Product name: {product?.name}</p>
        <p>Product description: {product?.description}</p>
        <p>Product price: {product?.price}</p>
        <p>
          Product amenities:{' '}
          {product?.amenities.map((amenity) => (
            <div key={amenity.amenity.id}>{amenity.amenity.name}</div>
          ))}
        </p>
        <p>
          Product rooms: {product?.room} bedrooms, {product?.bed} beds,
          {product?.bath} bathrooms
        </p>
        <p>Product max person: {product?.maxPerson}</p>
        <p>Product status: {product?.status}</p>
        <p>Product image: {product?.images.map((image) => image.imageId)}</p>
      </div>
    </div>
  );
};

export default EditProduct;
