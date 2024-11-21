import { Card, CardContent } from '@/components/ui/card';
import { getScopedI18n } from '@/locales/server';
import { ArrowUpCircle, MapPin, Plane, Train, Utensils } from 'lucide-react';
import { Location } from './location';

const locations = {
  nearby: [{ name: "Acropark au Ballon d'Alsace", distance: 14 }],
  restaurants: [
    { name: 'Chez Jean-Mi', distance: 2.3 },
    { name: 'Le Stubli', distance: 2.2 },
    { name: 'Le Refuge', distance: 2.5 },
  ],
  skiLifts: [
    { name: 'Téléski Bibi', distance: 1.1 },
    { name: 'Téléski Débutant', distance: 1.1 },
    { name: 'Téléski des Corbeaux', distance: 1.2 },
  ],
  airports: [
    { name: 'Aérodrome de Montbéliard – Courcelles', distance: 65 },
    { name: 'Aéroport de Colmar - Houssen', distance: 74 },
    { name: 'EuroAirport Mulhouse', distance: 74 },
  ],
  transport: [
    { name: 'Train · Oderen', distance: 17 },
    { name: 'Train · Kruth', distance: 18 },
  ],
};

export async function NearbyPlaces() {
  const tNearbyPlaces = await getScopedI18n('nearbyPlaces');

  return (
    <div>
      <div className='mx-auto my-10 w-full max-w-4xl'>
        <div className='flex flex-col items-center gap-4'>
          <h3 className='mx-auto text-3xl font-semibold tracking-tight text-foreground md:text-7xl'>
            {tNearbyPlaces('title')}
          </h3>
        </div>
      </div>
      <div className='flex flex-row items-center justify-center gap-16'>
        <Card className='mx-auto my-10 w-full max-w-2xl'>
          <CardContent className='grid gap-6 py-8'>
            <div className='space-y-4'>
              <div className='flex items-center gap-2'>
                <MapPin className='h-5 w-5' />
                <h3 className='text-lg font-semibold'>
                  {tNearbyPlaces('nearby')}
                </h3>
              </div>
              {locations.nearby.map((location) => (
                <div
                  key={location.name}
                  className='flex items-center justify-between pl-7'
                >
                  <span className=''>{location.name}</span>
                  <span className='text-muted-foreground'>
                    {location.distance} km
                  </span>
                </div>
              ))}
            </div>

            <div className='space-y-4'>
              <div className='flex items-center gap-2'>
                <Utensils className='h-5 w-5' />
                <h3 className='text-lg font-semibold'>
                  {tNearbyPlaces('restaurants')}
                </h3>
              </div>
              {locations.restaurants.map((location) => (
                <div
                  key={location.name}
                  className='flex items-center justify-between pl-7'
                >
                  <span className=''>Restaurant · {location.name}</span>
                  <span className='text-muted-foreground'>
                    {location.distance} km
                  </span>
                </div>
              ))}
            </div>

            <div className='space-y-4'>
              <div className='flex items-center gap-2'>
                <ArrowUpCircle className='h-5 w-5' />
                <h3 className='text-lg font-semibold'>
                  {tNearbyPlaces('skiLifts')}
                </h3>
              </div>
              {locations.skiLifts.map((location) => (
                <div
                  key={location.name}
                  className='flex items-center justify-between pl-7'
                >
                  <span className=''>{location.name}</span>
                  <span className='text-muted-foreground'>
                    {location.distance} km
                  </span>
                </div>
              ))}
            </div>

            <div className='space-y-4'>
              <div className='flex items-center gap-2'>
                <Plane className='h-5 w-5' />
                <h3 className='text-lg font-semibold'>
                  {tNearbyPlaces('airports')}
                </h3>
              </div>
              {locations.airports.map((location) => (
                <div
                  key={location.name}
                  className='flex items-center justify-between pl-7'
                >
                  <span className=''>{location.name}</span>
                  <span className='text-muted-foreground'>
                    {location.distance} km
                  </span>
                </div>
              ))}
            </div>

            <div className='space-y-4'>
              <div className='flex items-center gap-2'>
                <Train className='h-5 w-5' />
                <h3 className='text-lg font-semibold'>
                  {tNearbyPlaces('transport')}
                </h3>
              </div>
              {locations.transport.map((location) => (
                <div
                  key={location.name}
                  className='flex items-center justify-between pl-7'
                >
                  <span className=''>{location.name}</span>
                  <span className='text-muted-foreground'>
                    {location.distance} km
                  </span>
                </div>
              ))}
            </div>

            <p className='mt-4 text-xs text-muted-foreground'>
              {tNearbyPlaces('distanceNote')}
            </p>
          </CardContent>
        </Card>
        <div className='mx-auto my-10 w-full max-w-2xl'>
          <Location />
        </div>
      </div>
    </div>
  );
}
