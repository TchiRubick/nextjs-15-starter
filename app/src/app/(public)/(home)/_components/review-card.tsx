import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export interface ReviewCardProps {
  name: string;
  message: string;
  rating: 0 | 1 | 2 | 3 | 4 | 5;
  date: string;
}

export const ReviewCard = ({
  name,
  message,
  rating,
  date,
}: ReviewCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 35 }}
      transition={{ duration: 1 }}
      className='flex h-full flex-col rounded-2xl border-[1px] border-green-700 bg-primary/20 p-6 backdrop-blur-sm'
    >
      {/* Rating Stars */}
      <div className='flex gap-1'>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-slate-700 text-slate-700'
            }`}
          />
        ))}
      </div>

      {/* Message */}
      <blockquote className='mt-4 flex-grow text-base leading-relaxed text-gray-600'>
        &quot;{message}&quot;
      </blockquote>

      {/* Footer */}
      <div className='mt-6 flex items-center justify-between border-t border-green-950 pt-4'>
        <span className='text-base font-medium text-gray-600'>{name}</span>
        <time className='text-sm italic text-gray-600'>
          {format(new Date(date), 'MMMM yyyy', { locale: fr })}
        </time>
      </div>
    </motion.div>
  );
};
