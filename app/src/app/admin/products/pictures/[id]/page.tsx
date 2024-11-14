import { ImageUploader } from '../../_components/image-uploader';

const PicturesProduct = async ({
  params,
}: {
  params: Promise<{ id: number }>;
}) => {
  const { id } = await params;

  return (
    <div className='flex flex-col items-center justify-center py-4 pt-28'>
      <ImageUploader id={Number(id)} />
    </div>
  );
};

export default PicturesProduct;
