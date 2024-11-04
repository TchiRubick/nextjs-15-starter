'use client';

import { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { ReviewCard, type ReviewCardProps } from './review-card';

const reviews: ReviewCardProps[] = [
  {
    name: 'Romain',
    message: 'Super accueil, logement propre avec une belle vue.',
    rating: 4,
    date: '2024-08-27',
  },
  {
    name: 'Simone',
    message:
      'Le chalet est magnifique matériau exceptionnel endroit magnifique vu sur Bussang. \nNous avons apprécié le calme l exposition ensoleillée tout était parfait',
    rating: 5,
    date: '2024-08-09',
  },
  {
    name: 'Vat',
    message:
      'Très beau petit chalet et bien équipé, très propre, literie de bonne qualité. Endroit très calme on a pu profiter de la vue , bonne situation pour le départ des randonnées.',
    rating: 5,
    date: '2024-08-03',
  },
  {
    name: 'Hélène',
    message:
      'Chalet très bien équipé sur un site verdoyant. Nombreuses randonnées et sites à visiter dans les alentours ( Mines, Chèvrerie, Confiserie, musées, élevages…) ',
    rating: 5,
    date: '2024-06-08',
  },
  {
    name: 'Alexandra',
    message:
      'tout!! ambiance cocooning, très bien agencé et optimisé, les enfants aussi ont été ravis on a tous adoré . ',
    rating: 5,
    date: '2024-05-13',
  },
  {
    name: 'Daniel',
    message:
      'De notre arrivée au départ tout à été impeccable. Propriétaire super sympa et arrangeant, chalet sublime avec vue magnifique. Vraiment rien à dire. \nOn recommande à 200%.',
    rating: 5,
    date: '2024-05-13',
  },
  {
    name: 'Jean',
    message:
      "Bravo pour l'accueil chaleureux. \nLe Chalet est de belle qualité et très propre. \nLa vue de la terrasse est superbe. \nLes lits sont confortables.",
    rating: 5,
    date: '2024-05-13',
  },
  {
    name: 'Pierre',
    message:
      "Propriétaire disponible et d'une gentillesse exceptionnelle \nChalet parfaitement équipé, il ne manque rien \nPropreté impeccable \nConfort extra / literie confortable \nTout est pensé jusqu'au barbecue pour l'été \nPiste de ski à côté \nCadre très agréable",
    rating: 5,
    date: '2024-02-05',
  },
  {
    name: 'Mariannick',
    message:
      "Le chalet est très bien situé et super bien aménagé, en plus d'être très propre. ",
    rating: 5,
    date: '2024-02-04',
  },
  {
    name: 'L-ian',
    message:
      "Excellent week-end dans le chalet n°3 des refuges des hauts ! L'appartement est parfaitement équipé (literie excellente, lave linge, lave vaisselle... il y a même un appareil à raclette ! ), très chaleureux et la vue sur la vallée est un vrai...",
    rating: 5,
    date: '2024-02-02',
  },
];

export const Testimonials = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setTimeout(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        setCurrent(0);
        api.scrollTo(0);
      } else {
        api.scrollNext();
        setCurrent(current + 1);
      }
    }, 4000);
  }, [api, current]);

  return (
    <div className='w-full px-4 py-20 lg:py-40'>
      <div className='container mx-auto'>
        <div className='flex flex-col gap-10'>
          <h2 className='font-regular text-center text-3xl tracking-tighter md:text-5xl lg:max-w-xl lg:text-left'>
            Ce que les personnes ayant séjourné ici ont adoré
          </h2>
          <Carousel setApi={setApi} className='w-full md:px-44 lg:px-0'>
            <CarouselContent>
              {reviews.map((r) => (
                <CarouselItem className='lg:basis-1/3' key={r.name}>
                  <ReviewCard {...r} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
};
