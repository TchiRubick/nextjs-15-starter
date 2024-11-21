import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Utensils, ArrowUpCircle, Plane, Train } from 'lucide-react';

export function NearbyPlaces() {
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

  return (
    <Card className='mx-auto my-10 w-full max-w-2xl'>
      <CardHeader>
        <CardTitle className='text-2xl'>Distances et transports</CardTitle>
      </CardHeader>
      <CardContent className='grid gap-6'>
        <div className='space-y-4'>
          <div className='flex items-center gap-2'>
            <MapPin className='h-5 w-5' />
            <h3 className='font-semibold'>Lieux à proximité</h3>
          </div>
          {locations.nearby.map((location) => (
            <div
              key={location.name}
              className='flex items-center justify-between pl-7'
            >
              <span className='text-sm'>{location.name}</span>
              <span className='text-sm text-muted-foreground'>
                {location.distance} km
              </span>
            </div>
          ))}
        </div>

        <div className='space-y-4'>
          <div className='flex items-center gap-2'>
            <Utensils className='h-5 w-5' />
            <h3 className='font-semibold'>Restaurants et cafés</h3>
          </div>
          {locations.restaurants.map((location) => (
            <div
              key={location.name}
              className='flex items-center justify-between pl-7'
            >
              <span className='text-sm'>Restaurant · {location.name}</span>
              <span className='text-sm text-muted-foreground'>
                {location.distance} km
              </span>
            </div>
          ))}
        </div>

        <div className='space-y-4'>
          <div className='flex items-center gap-2'>
            <ArrowUpCircle className='h-5 w-5' />
            <h3 className='font-semibold'>Remontées mécaniques</h3>
          </div>
          {locations.skiLifts.map((location) => (
            <div
              key={location.name}
              className='flex items-center justify-between pl-7'
            >
              <span className='text-sm'>{location.name}</span>
              <span className='text-sm text-muted-foreground'>
                {location.distance} km
              </span>
            </div>
          ))}
        </div>

        <div className='space-y-4'>
          <div className='flex items-center gap-2'>
            <Plane className='h-5 w-5' />
            <h3 className='font-semibold'>Aéroports les plus proches</h3>
          </div>
          {locations.airports.map((location) => (
            <div
              key={location.name}
              className='flex items-center justify-between pl-7'
            >
              <span className='text-sm'>{location.name}</span>
              <span className='text-sm text-muted-foreground'>
                {location.distance} km
              </span>
            </div>
          ))}
        </div>

        <div className='space-y-4'>
          <div className='flex items-center gap-2'>
            <Train className='h-5 w-5' />
            <h3 className='font-semibold'>Transports en commun</h3>
          </div>
          {locations.transport.map((location) => (
            <div
              key={location.name}
              className='flex items-center justify-between pl-7'
            >
              <span className='text-sm'>{location.name}</span>
              <span className='text-sm text-muted-foreground'>
                {location.distance} km
              </span>
            </div>
          ))}
        </div>

        <p className='mt-4 text-xs text-muted-foreground'>
          Les distances affichées correspondent aux distances les plus courtes à
          pied ou en voiture. Les distances réelles peuvent varier.
        </p>
      </CardContent>
    </Card>
  );
}
