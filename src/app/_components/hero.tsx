'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoveRight, PhoneCall } from 'lucide-react';
import Image from 'next/image';

export const Hero = () => {
  return (
    <div className="relative h-[85vh] w-full overflow-hidden bg-slate-900">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div className="relative h-full w-full">
          {/* Image Grid */}
          <div className="grid h-full grid-cols-2 gap-4 opacity-70">
            <div className="relative h-full">
              <Image
                src="/275327112.jpg"
                alt="Chalet en automne"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="grid h-full grid-rows-2 gap-4">
              <div className="relative">
                <Image
                  src="/276286339.jpg"
                  alt="Chalet sous la neige"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="relative">
                <Image
                  src="/276236891.jpg"
                  alt="Vue hivernale"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-900/90" />
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-32">
        <div className="mb-24 max-w-2xl">
          <Badge
            variant="outline"
            className="mb-6 rounded-full border-white/20 bg-white/10 px-4 py-1 text-sm backdrop-blur-sm"
          >
            ✨ Nouveau sur Bussang
          </Badge>

          <h1 className="mb-6 text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Refuges des{' '}
            <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Hauts
            </span>
          </h1>

          <p className="mb-8 text-lg text-white/80 sm:text-xl">
            Vivez une expérience inoubliable dans notre chalet d'exception.
            Une expérience unique au cœur des Vosges, alliant confort moderne et
            authenticité de la montagne.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              className="group bg-white text-slate-900 hover:bg-white/90"
            >
              Réserver maintenant
              <MoveRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
            >
              Nous contacter
              <PhoneCall className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
