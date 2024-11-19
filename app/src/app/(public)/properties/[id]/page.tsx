'use server';

import { getProductQuery } from '@/actions/product.action';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Calendar, EuroIcon, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import qs from 'query-string';
import { ImageGallery } from '../_components/image-gallery';
import { PropertyFeatures } from '../_components/property-feature';

const PropertyDetails = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    check_in?: string;
    check_out?: string;
  }>;
}) => {
  const { id } = await params;

  const propertyId = Number(id);

  const property = await getProductQuery(propertyId);

  const urlParameters = await searchParams;

  if (!property)
    return (
      <main className='container mx-auto mt-16 min-h-screen px-4 lg:px-8'>
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
      </main>
    );

  return (
    <main className='min-h-screen bg-background'>
      <div className='container mx-auto px-4 py-8'>
        <ImageGallery images={property.images} />

        <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
          <div className='lg:col-span-2'>
            <div className='mb-6 flex items-start justify-between'>
              <div>
                <h1 className='mb-2 text-4xl font-bold'>{property.name}</h1>
                <p className='flex items-center text-2xl font-semibold text-primary'>
                  <EuroIcon className='mr-2 h-4 w-4' />
                  {property.price.toLocaleString()}
                </p>
              </div>
            </div>

            <PropertyFeatures
              bed={property.bed}
              bath={property.bath}
              maxPerson={property.maxPerson}
              room={property.room}
            />

            <div className='mb-8'>
              <h2 className='mb-4 text-2xl font-semibold'>Description</h2>
              <p className='leading-relaxed text-muted-foreground'>
                {property.description}
              </p>
            </div>

            <div>
              <h2 className='mb-4 text-2xl font-semibold'>Amenities</h2>
              <div className='grid grid-cols-2 gap-4 md:grid-cols-3'>
                {property.amenities.map((amenity) => (
                  <div
                    key={amenity.id}
                    className='flex items-center rounded-lg bg-muted p-3'
                  >
                    <span>{amenity.amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className='lg:col-span-1'>
            <Card className='sticky top-24 p-6'>
              <div className='space-y-4'>
                <Link
                  href={`/properties/schedule/${id}?${qs.stringify(urlParameters)}`}
                >
                  <Button className='w-full' size='lg'>
                    <Calendar className='mr-2 h-4 w-4' />
                    Book
                  </Button>
                </Link>
                <Separator />
                <Link href='/contact'>
                  <Button variant='outline' className='w-full' size='lg'>
                    <MessageSquare className='mr-2 h-4 w-4' />
                    Contact
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PropertyDetails;
