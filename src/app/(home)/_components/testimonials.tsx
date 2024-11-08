'use client';

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ReviewCard, ReviewCardProps } from './review-card';

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

    const interval = setInterval(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        setCurrent(0);
        api.scrollTo(0);
      } else {
        api.scrollNext();
        setCurrent(current + 1);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [api, current]);

  return (
    <div className='w-full bg-white py-24'>
      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='flex flex-col gap-16'
        >
          <div className='text-center'>
            <div className='mb-6 flex items-center justify-center gap-2'>
              <span className='text-sm font-medium text-slate-600'>
                Avis vérifiés
              </span>
              <Link
                href='https://www.booking.com/hotel/fr/refuges-des-hauts.fr.html'
                target='_blank'
              >
                <Image
                  src='/Booking.com_logo.svg'
                  alt='booking'
                  width={100}
                  height={100}
                />
              </Link>
            </div>

            <h2 className='mb-4 text-4xl font-medium tracking-tight text-slate-900 md:text-5xl'>
              L&apos;expérience de nos hôtes
            </h2>
            <p className='mx-auto max-w-2xl text-lg text-slate-600'>
              Note moyenne de{' '}
              <span className='font-medium text-slate-900'>9,8/10</span> basée
              sur l&apos;expérience authentique de nos clients
            </p>
          </div>

          <Carousel
            setApi={setApi}
            className='w-full'
            opts={{
              align: 'start',
              loop: true,
            }}
          >
            <CarouselContent className='-ml-4'>
              {reviews.map((review) => (
                <CarouselItem
                  key={review.name}
                  className='pl-4 md:basis-1/2 lg:basis-1/3'
                >
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ReviewCard {...review} />
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <div className='flex justify-center gap-2'>
            {reviews.map((_, index) => (
              <button
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === current
                    ? 'w-8 bg-slate-900'
                    : 'w-2 bg-slate-200 hover:bg-slate-300'
                }`}
                onClick={() => {
                  api?.scrollTo(index);
                  setCurrent(index);
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};