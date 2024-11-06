import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

export function Features() {
  const amenities = [
    {
      icon: <Car className='h-6 w-6' />,
      title: 'Parking',
      description:
        'Un parking gratuit et privé est disponible sur place (sans réservation préalable).',
      items: ['Parking accessible aux personnes à mobilité réduite'],
      background: '/parking1.jpg',
    },
    {
      icon: <Wifi className='h-6 w-6' />,
      title: 'Internet',
      description:
        "Connexion Wi-Fi rapide gratuite : 195 Mb/s. Débit adapté au streaming 4K et aux appels vidéo sur plusieurs appareils. Le test de débit a été effectué par l'établissement.",
      items: [],
      background: '/internet.jpg',
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
      background: '/utensils.jpg',
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
      background: '/highTech.jpg',
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
      background: '/bedDouble.jpg',
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
      background: '/exterior.jpg',
    },
    {
      icon: <Mountain className='h-6 w-6' />,
      title: 'Extérieur/Vues',
      items: ['Vue sur la montagne', 'Vue'],
      background: '/mountain.jpg',
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
      background: '/activities.jpg',
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
      background: '/s.jpg',
    },
    {
      icon: <Languages className='h-6 w-6' />,
      title: 'Langues parlées',
      items: ['Anglais', 'Espagnol', 'Français'],
      background: '/f.jpg',
    },
  ];

  return (
    <div className='container mx-auto px-4 py-8'>
      <h2 className='font-regular mb-10 text-left text-3xl tracking-tighter md:text-5xl lg:max-w-xl'>
        Équipements et services
      </h2>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {amenities.map((amenity, index) => (
          <Card
            key={index}
            className='overflow-hidden hover:scale-105 hover:transition hover:duration-300 hover:ease-in-out'
            style={{
              backgroundImage: `url(${amenity.background})`,
              backgroundSize: 'cover',
            }}
          >
            <CardHeader className='bg-primary p-4 text-primary-foreground'>
              <div className='flex items-center gap-3'>
                {amenity.icon}
                <CardTitle>{amenity.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className='p-4'>
              {amenity.description && (
                <p className='mb-4 rounded-lg bg-slate-50 bg-opacity-80 p-1 text-sm text-muted-foreground'>
                  {amenity.description}
                </p>
              )}
              <ul className='space-y-2'>
                {amenity.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className='flex w-fit items-start gap-2 rounded-full bg-slate-500 p-1 opacity-80'
                  >
                    <CheckCircle className='mt-1 h-4 w-4 flex-shrink-0 text-green-500' />
                    <span className='text-sm text-white'>
                      {typeof item === 'string' ? (
                        item
                      ) : (
                        <span>
                          {item.name}
                          {item.note && (
                            <span className='ml-1 rounded-full bg-secondary px-2 py-1 text-xs text-secondary-foreground'>
                              {item.note}
                            </span>
                          )}
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
