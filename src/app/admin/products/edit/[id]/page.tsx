import { getOneProductAction } from '../../action';
import { EditProductForm } from '../_components/edit-product-form';
import getQueryClient from '@/lib/query-client';
import { getAmenitiesAction } from '../../create/action';
import { AMENITIES_QUERY_KEY } from '@/app/admin/amenities/static';

const EditProduct = async ({ params }: { params: Promise<{ id: number }> }) => {
  const { id } = await params;
  const queryClient = getQueryClient();

  const [product] = await Promise.all([
    getOneProductAction(id),
    queryClient.prefetchQuery({
      queryKey: AMENITIES_QUERY_KEY,
      queryFn: getAmenitiesAction,
    }),
  ]);

  const adaptedProduct = {
    name: product?.name ?? '',
    description: product?.description ?? '',
    price: product?.price ?? 0,
    room: product?.room ?? 1,
    bed: product?.bed ?? 0,
    bath: product?.bath ?? 0,
    maxPerson: product?.maxPerson ?? 0,
    amenities: product?.amenities.map((a) => String(a.amenityId)) ?? [],
    status: product?.status ?? 'draft',
  };

  return (
    <div className='flex items-center justify-center py-4 pt-28'>
      <EditProductForm product={adaptedProduct} />
    </div>
  );
};

export default EditProduct;
