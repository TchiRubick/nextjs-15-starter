'use client';
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
import { useState } from 'react';

export function Features() {
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
      items: [],
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

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='grid grid-cols-2 mt-5'>
        {/* Liste des titres */}
        <div  style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #ccc' }}>
          {amenities.map((tableau, index) => (
            <ul>
              <div
                key={index}
                className='flex flex-col my-8'
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}

              >
                <span className=''>{tableau.title}</span>
              </div>
            </ul>
          ))}
        </div>

        {/* Liste des items pour l'élément survolé */}
        <div>
          {hoveredIndex !== null && (
            <div className='flex flex-col'>
              {amenities[hoveredIndex].items.map((item, index) => (
                <div key={index} className='flex items-center my-5 gap-2'>
                  <CheckCircle className='h-5 w-5 text-green-500' />
                  <span className='text-sm'>{typeof item === 'string' ? item : item.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
