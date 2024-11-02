'use server';

import { AboutHero } from './_components/about-hero';

export default async function About() {
  return (
    <main>
      <AboutHero />
      <section className='flex w-full flex-col items-center justify-center py-10 lg:py-20'>
        <h4 className='font-regular text-left text-3xl tracking-tighter'>
          Selon les clients, la description et les photos de cet établissement
          reflètent vraiment la réalité.
        </h4>
        <p className='mt-4 max-w-xl text-left text-base leading-relaxed tracking-tight text-muted-foreground'>
          Offrant une vue sur la montagne, ce chalet comprend une terrasse, un
          coin salon, une télévision par satellite à écran plat, une cuisine
          entièrement équipée avec un lave-vaisselle et un micro-ondes ainsi
          qu'une salle de bains privative pourvue d'une douche et d'un
          sèche-cheveux. Un grille-pain, un réfrigérateur, des plaques de
          cuisson, une machine à café et une bouilloire sont également fournis.
          Le linge de lit et les serviettes sont fournis.
        </p>
        <p className='mt-4 max-w-xl text-left text-base leading-relaxed tracking-tight text-muted-foreground'>
          En été, vous pourrez utiliser le barbecue et dîner sur le balcon
          privé.
        </p>
        <p className='mt-4 max-w-xl text-left text-base leading-relaxed tracking-tight text-muted-foreground'>
          Un service de location de vélos est assuré sur place pour vous
          permettre de partir à la découverte des environs. Vous pourrez
          pratiquer le ski et le vélo dans les environs. Un service de location
          de matériel de ski, un point de vente de forfaits de ski et un local à
          skis sont également disponibles sur place.
        </p>
        <p className='mt-4 max-w-xl text-left text-base leading-relaxed tracking-tight text-muted-foreground'>
          L'aéroport le plus proche, celui de Mulhouse-Fribourg, est situé à 75
          km.
        </p>
      </section>
    </main>
  );
}
