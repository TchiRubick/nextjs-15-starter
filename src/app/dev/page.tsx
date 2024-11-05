'use server';

import { getAvailability } from '@packages/uplisting';
import Image from 'next/image';

export default async function Dev() {
  const availability = await getAvailability();

  return (
    <main className='mt-24 flex flex-col items-center justify-center'>
      <div className='flex flex-col gap-4'>
        {availability.map((item) => (
          <ul key={item.id}>
            <li>name: {item.name}</li>
            <li>description: {item.description}</li>
            <li>capacity: {item.capacity}</li>
            <li>bedrooms: {item.rooms.bedrooms}</li>
            <li>beds: {item.rooms.beds}</li>
            <li>bathrooms: {item.rooms.bathrooms}</li>
            <li>
              address: {item.address.street}, {item.address.city},{' '}
              {item.address.state}, {item.address.zip_code},{' '}
              {item.address.country}
            </li>
            <li>
              amenities:
              <ol>
                {item.amenities.map((amenity) => (
                  <li key={amenity.group}>
                    {amenity.group}: {amenity.values.join(', ')}
                  </li>
                ))}
              </ol>
            </li>
            <li>
              photos:
              <ol>
                {item.photos.map((photo) => (
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
        ))}
      </div>
    </main>
  );
}
