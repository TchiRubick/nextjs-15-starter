'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type Card = {
  id: number;
  image: string;
};

interface CardProps {
  cards: Card[];
  item: Card;
  setCards: Dispatch<SetStateAction<Card[]>>;
  index: number;
}

const cardsData: Card[] = [
  { id: 1, image: '/amenities/310428160.jpg' },
  { id: 2, image: '/amenities/310428287.jpg' },
  { id: 3, image: '/amenities/606647110.jpg' },
  { id: 4, image: '/275327112.jpg' },
  { id: 5, image: '/276236512.jpg' },
  { id: 6, image: '/465531141.jpg' },
];

const CardComponent = ({ item, cards, setCards, index }: CardProps) => {
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-160, 0, 160], [0, 1, 0]);
  const cardsRotation = useTransform(x, [-160, 160], [-20, 20]);
  const frontCard = index === 0;

  const rotate = useTransform(() => {
    const newOffset = frontCard ? 0 : index % 2 ? 10 : -10;
    return `${cardsRotation.get() + newOffset}deg`;
  });

  const handleDragEnd = () => {
    if (Math.abs(x.get()) > 50) {
      setCards((prevCards) => prevCards.filter((card) => card.id !== item.id));
    }
  };

  return (
    <motion.img
      src={item.image}
      drag={frontCard ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      alt='bossadi zenith'
      className='h-96 w-80 origin-bottom rounded-2xl border-4 object-cover hover:cursor-grab active:cursor-grabbing'
      style={{
        opacity,
        rotate,
        x,
        transition: '.125s transform',
        gridRow: 1,
        gridColumn: 1,
        zIndex: cards.length - index,
      }}
      onDragEnd={handleDragEnd}
    />
  );
};

export const Sweeper = () => {
  const [cards, setCards] = useState<Card[]>(cardsData);

  useEffect(() => {
    if (cards.length === 0) {
      setCards(cardsData);
    }
  }, [cards]);

  return (
    <div className='grid h-full w-full place-items-center'>
      {cards
        .slice()
        .reverse()
        .map((card, index) => (
          <CardComponent
            key={card.id}
            item={card}
            cards={cards}
            setCards={setCards}
            index={index}
          />
        ))}
    </div>
  );
};
