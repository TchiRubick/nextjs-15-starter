'use server';

import { getProductQuery } from '@/actions/product.action';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { TODAY, TOMORROW } from '@/lib/date';
import { getScopedI18n } from '@/locales/server';
import { EuroIcon, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ImageGallery } from '../_components/image-gallery';
import { PropertyFeatures } from '../_components/property-feature';
import { ScheduleForm } from './_components/schedule-form';

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

  if (isNaN(propertyId)) {
    redirect('/properties');
  }

  if (!property) {
    redirect(`/properties`);
  }

  const urlParameters = await searchParams;

  const formValues = {
    check_in: urlParameters.check_in ? new Date(urlParameters.check_in) : TODAY,
    check_out: urlParameters.check_out
      ? new Date(urlParameters.check_out)
      : TOMORROW,
  };

  const tPropertyDetails = await getScopedI18n('propertyDetails');

  if (!property)
    return (
      <main className='container mx-auto mt-16 min-h-screen px-4 lg:px-8'>
        <div className='flex flex-col items-center justify-center'>
          <h3 className='py-8 text-2xl font-bold'>
            {tPropertyDetails('noAvailability')}
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
                  {property.price.toLocaleString()}{' '}
                  {tPropertyDetails('currency')}
                </p>
              </div>
            </div>

            <PropertyFeatures
              bed={property.bed}
              bath={property.bath}
              maxPerson={property.maxPerson}
              room={property.room}
              area={property.area}
            />

            <div className='mb-8'>
              <h2 className='mb-4 text-2xl font-semibold'>
                {tPropertyDetails('descriptionTitle')}
              </h2>
              <p className='leading-relaxed text-muted-foreground'>
                {property.description}
              </p>
            </div>

            <div>
              <h2 className='mb-4 text-2xl font-semibold'>
                {tPropertyDetails('amenitiesTitle')}
              </h2>
              <div className='grid grid-cols-2 gap-4 md:grid-cols-3'>
                {property.amenities
                  .sort((a, b) => a.amenity.name.localeCompare(b.amenity.name))
                  .map((amenity) => (
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
                <ScheduleForm property={property} formValues={formValues} />
                <Separator />
                <Link href='/contact'>
                  <Button variant='outline' className='w-full' size='lg'>
                    <MessageSquare className='mr-2 h-4 w-4' />
                    {tPropertyDetails('contact')}
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
