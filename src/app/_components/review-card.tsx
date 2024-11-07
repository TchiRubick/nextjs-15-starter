import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Star } from 'lucide-react';

export interface ReviewCardProps {
  name: string;
  message: string;
  rating: 0 | 1 | 2 | 3 | 4 | 5;
  date: string;
}

export const ReviewCard = ({ name, message, rating, date }: ReviewCardProps) => {
  return (
    <div className="flex h-full flex-col rounded-2xl bg-slate-800 p-6">
      {/* Rating Stars */}
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < rating
              ? 'fill-yellow-400 text-yellow-400'
              : 'fill-slate-700 text-slate-700'
              }`}
          />
        ))}
      </div>

      {/* Message */}
      <blockquote className="mt-4 flex-grow text-base leading-relaxed text-slate-300">
        "{message}"
      </blockquote>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between border-t border-slate-700 pt-4">
        <span className="text-base font-medium text-white">{name}</span>
        <time className="text-sm text-slate-400">
          {format(new Date(date), 'MMMM yyyy', { locale: fr })}
        </time>
      </div>
    </div>
  );
};
