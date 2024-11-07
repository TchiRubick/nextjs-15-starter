'use server';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import InternalError from '@/lib/error';
import { getProperty } from '@packages/uplisting';
import { Bath, Bed, Check, House, MapPin, User, X } from 'lucide-react';
import Image from 'next/image';
import { iconsForAmenitiesName, iconsSuitabilty } from './icons';

const PropertyDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const property = await getProperty(id);

  return (
    <main className='container mx-auto mt-16 min-h-screen px-4 lg:px-8'>
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
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-[2fr,1fr]'>
          {/* Left Column */}
          <div className='space-y-6'>
            {/* Header Section */}
            <div className='space-y-2'>
              <h1 className='text-4xl font-bold'>{property.name}</h1>
              <div className='flex items-center text-muted-foreground'>
                <MapPin className='mr-2 h-4 w-4' />
                <span>
                  {property.address.street}, {property.address.city},
                  {property.address.state}, {property.address.zip_code},
                  {property.address.country}
                </span>
              </div>
            </div>

            {/* Image Carousel */}
            <div className='overflow-hidden rounded-xl'>
              <Carousel className='w-full'>
                <CarouselContent>
                  {property.photos.map((photo) => (
                    <CarouselItem key={photo.url}>
                      <div className='relative aspect-[16/9] w-full'>
                        <Image
                          src={photo.url}
                          alt={photo.created_at}
                          fill
                          className='object-cover'
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselNext className='right-4' />
                <CarouselPrevious className='left-4' />
              </Carousel>
            </div>

            {/* Description */}
            <Card className='border-none'>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent className='prose max-w-none text-muted-foreground'>
                {property.description}
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card className='border-none'>
              <CardHeader>
                <CardTitle>Équipements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                  {property.amenities.map((amenity) => (
                    <div
                      key={`${amenity.group}-${amenity.name}`}
                      className='flex items-center gap-2'
                    >
                      <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary/10'>
                        {
                          iconsForAmenitiesName[
                            amenity.name as keyof typeof iconsForAmenitiesName
                          ]
                        }
                      </div>
                      <div className='flex flex-col'>
                        <span className='text-sm font-medium'>
                          {amenity.name}
                        </span>
                        <span className='text-xs text-muted-foreground'>
                          {amenity.group}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sticky */}
          <div className='lg:sticky lg:top-24 lg:h-fit'>
            {/* Property Details Card */}
            <Card className='mb-6 border-none'>
              <CardHeader>
                <CardTitle>Détails du logement</CardTitle>
              </CardHeader>
              <CardContent className='grid grid-cols-2 gap-4'>
                <div className='flex items-center gap-2'>
                  <Bed className='h-5 w-5 text-primary' />
                  <div>
                    <p className='font-medium'>{property.rooms.beds} lit(s)</p>
                    <p className='text-sm text-muted-foreground'>Couchages</p>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <Bath className='h-5 w-5 text-primary' />
                  <div>
                    <p className='font-medium'>{property.rooms.bathrooms}</p>
                    <p className='text-sm text-muted-foreground'>
                      Salle de bain
                    </p>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <House className='h-5 w-5 text-primary' />
                  <div>
                    <p className='font-medium'>{property.rooms.bedrooms}</p>
                    <p className='text-sm text-muted-foreground'>Chambre(s)</p>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <User className='h-5 w-5 text-primary' />
                  <div>
                    <p className='font-medium'>{property.capacity}</p>
                    <p className='text-sm text-muted-foreground'>
                      Voyageurs max
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fees Card */}
            <Card className='border-none'>
              <CardHeader>
                <CardTitle>Frais supplémentaires</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-3'>
                  {property.property_fees.map((fee) => (
                    <div key={fee.name} className='flex justify-between'>
                      <span className='text-muted-foreground'>{fee.name}</span>
                      <span className='font-medium'>{fee.amount} AED</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Discount Card */}
            {property.property_discounts.length > 0 && (
              <Card className='border-none'>
                <CardHeader>
                  <CardTitle>Promotion</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-3'>
                    {property.property_discounts.map((discount) => (
                      <div
                        key={discount.name}
                        className='flex flex-col justify-between'
                      >
                        <span className='text-muted-foreground'>
                          {discount.name}
                        </span>
                        <span className='font-medium'>
                          {discount.amount} AED
                        </span>
                        <span className='text-sm'>{discount.days}</span>
                        <span className='text-sm text-muted-foreground'>
                          {discount.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Suitability card */}
          <Card className='border-none'>
            <CardHeader>
              <CardTitle>Partinance</CardTitle>
            </CardHeader>
            <CardContent className='prose max-w-none text-muted-foreground'>
              {Object.keys(property.suitability).map((key) => (
                <p key={key} className='flex items-center gap-2'>
                  {iconsSuitabilty[key as keyof typeof iconsSuitabilty]}
                  {key}{' '}
                  {property.suitability[
                    key as keyof typeof property.suitability
                  ] ? (
                    <Check className='h-4 w-4 text-primary' />
                  ) : (
                    <X className='h-4 w-4 text-muted-foreground' />
                  )}
                </p>
              ))}
            </CardContent>
          </Card>

          {property.property_taxes.length > 0 && (
            <Card className='border-none'>
              <CardHeader>
                <CardTitle>Impôts</CardTitle>
              </CardHeader>
              <CardContent className='prose max-w-none text-muted-foreground'>
                <p className='flex items-center gap-2'>
                  {property.property_taxes.map((tax) => (
                    <div key={tax.name}>
                      <p>{tax.name}</p>
                      <p className='text-sm text-muted-foreground'>
                        {tax.amount} AED
                      </p>
                      <span className='text-sm'>{tax.per}</span>
                    </div>
                  ))}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </main>
  );
};

export default PropertyDetails;
