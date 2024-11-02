'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const titles = [
  'Séjour au calme proche de la nature.',
  'Excellent séjour',
  'Fabuleux',
  'Totale déconnection du quotidien',
  'A voir en hiver',
  'Exceptionnel',
  'Belles prestations',
  'Parfait pour un week-end',
  'ou un séjour plus long en famille',
  'Un chalet tout confort et très bien agencé !',
];

export const Titles = () => {
  const [titleNumber, setTitleNumber] = useState(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className='my-14 flex justify-center py-20'>
      {titles.map((_, index) => (
        <motion.span
          className='absolute text-6xl font-semibold'
          initial={{ opacity: 0, y: '-100' }}
          transition={{ type: 'spring', stiffness: 50 }}
          key={_}
          animate={
            titleNumber === index
              ? {
                  y: 0,
                  opacity: 1,
                }
              : {
                  y: titleNumber > index ? -150 : 150,
                  opacity: 0,
                }
          }
        >
          {titles[titleNumber]}
        </motion.span>
      ))}
    </div>
  );
};
