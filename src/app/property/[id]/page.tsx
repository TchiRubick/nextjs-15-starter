'use server';

import InternalError from '@/lib/error';
import { getProperty } from '@packages/uplisting';
import Image from 'next/image';

const PropertyDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const property = await getProperty(id);

  return (
    <main className='mt-16 flex min-h-screen flex-col items-center justify-items-start space-y-4'>
      {property instanceof InternalError && (
        <div className='flex flex-col items-center justify-center'>
          <h3 className='py-8 text-2xl font-bold'>
            Aucune disponibilité trouvée
          </h3>
          <Image
            src='/illustration/undraw_empty_re_opql.svg'
            alt='no data'
            width={700}
            height={700}
          />
        </div>
      )}
      {property && property instanceof InternalError === false && (
        <div className='flex flex-col gap-4'>
          <ul>
            <li>name: {property.name}</li>
            <li>description: {property.description}</li>
            <li>capacity: {property.capacity}</li>
            <li>bedrooms: {property.rooms.bedrooms}</li>
            <li>beds: {property.rooms.beds}</li>
            <li>bathrooms: {property.rooms.bathrooms}</li>
            <li>
              address: {property.address.street}, {property.address.city},{' '}
              {property.address.state}, {property.address.zip_code},{' '}
              {property.address.country}
            </li>
            <li>
              amenities:
              <ol>
                {property.amenities.map((amenity) => (
                  <li key={`${amenity.group}-${amenity.name}`}>
                    {amenity.group}: {amenity.name}
                  </li>
                ))}
              </ol>
            </li>
            <li>
              photos:
              <ol>
                {property.photos.map((photo) => (
                  <li key={photo.url}>
                    <Image
                      src={photo.url}
                      alt={photo.created_at}
                      width={100}
                      height={100}
                    />
                  </li>
                ))}
              </ol>
            </li>
          </ul>
        </div>
      )}
    </main>
  );
};

export default PropertyDetails;
