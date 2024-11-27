import { getAmenitiesQuery } from '@/actions/amenity.action';
import { getProductQuery } from '@/actions/product.action';
import { AMENITIES_QUERY_KEY } from '@/app/[locale]/admin/amenities/static';
import getQueryClient from '@/lib/query-client';
import { EditProductForm } from '../_components/edit-product-form';
import { PicturesSection } from '../_components/pictures-section';

const EditProduct = async ({ params }: { params: Promise<{ id: number }> }) => {
  const { id } = await params;
  const queryClient = getQueryClient();

  const [product] = await Promise.all([
    getProductQuery(id),
    queryClient.prefetchQuery({
      queryKey: AMENITIES_QUERY_KEY,
      queryFn: getAmenitiesQuery,
    }),
  ]);

  const adaptedProduct = {
    name: product?.name ?? '',
    description: product?.description ?? '',
    price: product?.price ?? 0,
    room: product?.room ?? 1,
    bed: product?.bed ?? 0,
    bath: product?.bath ?? 0,
    area: product?.area ?? 0,
    maxPerson: product?.maxPerson ?? 0,
    amenities: product?.amenities.map((a) => String(a.amenityId)) ?? [],
    status: product?.status ?? 'draft',
  };

  return (
    <div className='w-full px-2 py-2'>
      <PicturesSection
        id={id}
        urls={product?.images.map((i) => i.image.url) || []}
      />
      <EditProductForm product={adaptedProduct} productId={id} />
    </div>
  );
};

export default EditProduct;
