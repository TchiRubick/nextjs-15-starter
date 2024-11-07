'use server';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import InternalError from '@/lib/error';
import { getProperty } from '@packages/uplisting';
import { Label } from '@radix-ui/react-label';
import { Bath, Bed, Home, House, MapPin, User } from 'lucide-react';
import Image from 'next/image';
import { iconsForAmenitiesGroup, iconsForAmenitiesName } from './icons';

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
          <Label className='text-3xl font-bold'> {property.name} </Label>
          <Label className='flex items-center text-muted-foreground'>
            <MapPin className='mr-2 h-4 w-4' />
            {property.address.street}, {property.address.city},
            {property.address.state}, {property.address.zip_code},
            {property.address.country}
          </Label>

          <Carousel>
            <CarouselContent>
              {property.photos.map((photo) => (
                <div key={photo.url}>
                  <CarouselItem key={photo.url}>
                    <Image
                      src={photo.url}
                      alt={photo.created_at}
                      width={5000}
                      height={5000}
                    />
                  </CarouselItem>
                </div>
              ))}
            </CarouselContent>
            <CarouselNext />
            <CarouselPrevious />
          </Carousel>

          <Card className='w-fit rounded-lg'>
            <CardHeader></CardHeader>

            <CardContent className='flex flex-row gap-3'>
              <span className='flex items-center gap-1'>
                <Bed className='mr-1 h-11 w-11' />
                <span className='text-lg font-bold'>{property.rooms.beds}</span>
                <span className='text-muted-foreground'> lit(s)</span>
              </span>

              <span className='flex items-center gap-1'>
                <Bath className='mr-1 h-11 w-11' />
                <span className='text-lg font-bold'>
                  {property.rooms.bathrooms}
                </span>
                <span className='text-muted-foreground'>salle de bain</span>
              </span>

              <span className='flex items-center gap-1'>
                <House className='mr-1 h-11 w-11' />
                <span className='text-lg font-bold'>
                  {property.rooms.bedrooms}
                </span>
                <span className='text-muted-foreground'> chambre(s)</span>
              </span>

              <span className='flex items-center gap-1'>
                <User className='mr-1 h-11 w-11' />
                <span className='text-lg font-bold'>{property.capacity}</span>
                <span className='text-muted-foreground'> personne(s) max</span>
              </span>
            </CardContent>

            <CardFooter></CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>{property.description}</CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Amenities</CardTitle>
            </CardHeader>
            <CardContent>
              <ul>
                {property.amenities.map((amenity) => (
                  <li key={`${amenity.group}-${amenity.name}`} className='flex'>
                    <span className='mr-2 flex items-center'>
                      {iconsForAmenitiesGroup[
                        amenity.group as keyof typeof iconsForAmenitiesGroup
                      ] && (
                        <span style={{ marginRight: '8px' }}>
                          {
                            iconsForAmenitiesGroup[
                              amenity.group as keyof typeof iconsForAmenitiesGroup
                            ]
                          }
                        </span>
                      )}
                      {amenity.group}:
                    </span>
                    <span className='flex items-center gap-1'>
                      {
                        iconsForAmenitiesName[
                          amenity.name as keyof typeof iconsForAmenitiesName
                        ]
                      }
                      {amenity.name}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className='w-fit'>
            <CardHeader>
              <CardTitle> Fees </CardTitle>
            </CardHeader>
            <CardContent>
              {property.property_fees.map((fee) => (
                <div key={fee.name}>
                  <p>{fee.name} </p>
                  <p>{fee.amount} AED</p>
                </div>
              ))}
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </div>
      )}
    </main>
  );
};

export default PropertyDetails;
