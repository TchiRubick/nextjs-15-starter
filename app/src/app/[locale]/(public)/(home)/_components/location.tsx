'use client';
import { Map, Marker } from '@vis.gl/react-maplibre';
import { MapPin } from 'lucide-react';
import 'maplibre-gl/dist/maplibre-gl.css';

const lon = 6.8660573;
const lat = 47.8993346;

export const Location = () => (
  <div className='relative py-8'>
    <Map
      initialViewState={{
        longitude: lon,
        latitude: lat,
        zoom: 15,
      }}
      style={{
        width: '100%',
        height: 800,
        borderRadius: 10,
        boxShadow: '0 0 1px #000000',
      }}
      mapStyle='https://tiles.openfreemap.org/styles/liberty'
    >
      <Marker longitude={lon} latitude={lat} anchor='bottom'>
        <MapPin className='h-5 w-5 text-emerald-900' />
      </Marker>
    </Map>
    <p className='absolute top-0 text-sm text-muted-foreground'>
      lon: {lon} lat: {lat}
    </p>
  </div>
);
