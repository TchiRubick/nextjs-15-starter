'use client';

import * as React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  BedDouble,
  Bike,
  Car,
  CheckCircle,
  Languages,
  Mountain,
  Shield,
  TreePine,
  Tv,
  Utensils,
  Wifi,
} from 'lucide-react';

const amenities = [
  {
    icon: <Car className='h-6 w-6' />,
    title: 'Parking',
    description:
      'Un parking gratuit et privé est disponible sur place (sans réservation préalable).',
    items: ['Parking accessible aux personnes à mobilité réduite'],
  },
  {
    icon: <Wifi className='h-6 w-6' />,
    title: 'Internet',
    description:
      "Connexion Wi-Fi rapide gratuite : 195 Mb/s. Débit adapté au streaming 4K et aux appels vidéo sur plusieurs appareils. Le test de débit a été effectué par l'établissement.",
    items: ['WiFi gratuit', 'Haut débit', 'Ethernet'],
  },
  {
    icon: <Utensils className='h-6 w-6' />,
    title: 'Cuisine',
    items: [
      'Table à manger',
      'Machine à café',
      'Produits ménagers',
      'Grille-pain',
      'Plaque de cuisson',
      'Ustensiles de cuisine',
      'Bouilloire électrique',
      'Cuisine',
      'Lave-linge',
      'Lave-vaisselle',
      'Micro-ondes',
      'Réfrigérateur',
    ],
  },
  {
    icon: <Tv className='h-6 w-6' />,
    title: 'High-tech',
    items: [
      'Service de streaming (ex. Netflix)',
      'Télévision à écran plat',
      'Chaînes satellite',
      'Radio',
      'Télévision',
    ],
  },
  {
    icon: <BedDouble className='h-6 w-6' />,
    title: 'Équipements en chambre',
    items: [
      'Prise près du lit',
      'Étendoir',
      'Portant',
      'Parquet',
      'Insonorisation',
      'Chambre(s) communicante(s) disponible(s)',
      'Matériel de repassage',
      'Fer à repasser',
    ],
  },
  {
    icon: <TreePine className='h-6 w-6' />,
    title: 'En extérieur',
    items: [
      'Aire de pique-nique',
      'Mobilier extérieur',
      'Espace repas extérieur',
      'Terrasse bien exposée',
      'Barbecue',
      'Installations pour barbecue',
      'Balcon',
      'Terrasse',
      'Jardin',
    ],
  },
  {
    icon: <Mountain className='h-6 w-6' />,
    title: 'Extérieur/Vues',
    items: ['Vue sur la montagne', 'Vue'],
  },
  {
    icon: <Bike className='h-6 w-6' />,
    title: 'Activités',
    items: [
      { name: 'Concerts/Spectacles', note: 'En supplément' },
      { name: 'Visites à vélo', note: 'En supplément' },
      { name: 'Balades à pied' },
      { name: 'Accès skis aux pieds' },
      { name: 'Vente de forfaits de ski' },
      { name: "Location d'équipement de ski sur place" },
      { name: 'École de ski', note: 'En supplément' },
      { name: 'Local à skis' },
      { name: 'Cyclisme', note: "En dehors de l'établissement" },
      { name: 'Randonnée', note: "En dehors de l'établissement" },
      { name: 'Ski' },
    ],
  },
  {
    icon: <Shield className='h-6 w-6' />,
    title: 'Sécurité',
    items: [
      'Extincteurs',
      "Caméras de surveillance à l'extérieur de l'établissement",
      'Caméras de surveillance dans les parties communes',
      'Détecteurs de fumée',
    ],
  },
  {
    icon: <Languages className='h-6 w-6' />,
    title: 'Langues parlées',
    items: ['Anglais', 'Espagnol', 'Français'],
  },
];

export function Features() {
  const [activeIndex, setActiveIndex] = React.useState(2); // Default to Cuisine

  return (
    <div className='flex h-screen w-full'>
      <div className='flex h-screen gap-8 rounded-lg p-8'>
        <div className='w-1/3 max-w-2xl shrink-0 pl-16'>
          <h2 className='mb-4 text-2xl font-semibold sm:text-4xl'>
            Catégories
          </h2>
          <ScrollArea className='h-screen'>
            <div className='pr-4'>
              {amenities.map((category, index) => (
                <button
                  key={index}
                  className={`mb-2 w-56 rounded-lg px-4 py-3 text-left text-2xl transition-colors ${
                    activeIndex === index
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  }`}
                  onClick={() => setActiveIndex(index)}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className='ml-28 w-2/3 flex-1'>
          <h2 className='mb-4 text-2xl font-semibold sm:text-4xl'>
            {amenities[activeIndex].title}
          </h2>
          <ScrollArea className='h-[700px]'>
            <div className='grid gap-2 pr-4'>
              {amenities[activeIndex].items.map((item, i) => (
                <div
                  key={i}
                  className='mb-4 flex items-center gap-2 rounded-lg bg-emerald-200/15 px-4 py-2 text-2xl'
                >
                  <CheckCircle className='h-4 w-4 text-primary' />
                  <span>{typeof item === 'string' ? item : item.name}</span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
