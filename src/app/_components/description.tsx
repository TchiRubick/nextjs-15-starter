// 276236512

import Image from 'next/image';
export const Description = () => (
  <div className='w-full py-20 lg:py-40'>
    <div className='container mx-auto'>
      <div className='flex flex-col-reverse gap-10 lg:flex-row lg:items-center'>
        <div>
          <Image
            className='aspect-square h-[180px] w-full rounded-md object-cover sm:h-[240px] lg:h-[300px]'
            src='/276236512.jpg'
            alt='hero-3'
            width={300}
            height={200}
            priority
          />
        </div>
        <div className='flex flex-1 flex-col gap-4 pl-0 lg:pl-20'>
          <div className='flex flex-col gap-2'>
            <h2 className='font-regular text-nowrap text-left text-xl tracking-tighter md:text-3xl lg:max-w-xl'>
              Confort et Activités en Montagne
            </h2>
            <p className='text-base leading-relaxed tracking-tight text-muted-foreground'>
              Situé à Bussang, à moins de 37 km du lac de Gérardmer et à 46 km
              de la gare de Belfort, le Refuges des Hauts propose un hébergement
              avec un accès skis aux pieds. Vous bénéficierez gratuitement
              d&apos;une connexion Wi-Fi et d&apos;un parking privé. Situé à 40
              km du lac Longemer, ce chalet dispose d&apos;un casino et
              d&apos;un jardin. Il propose des chambres familiales et une aire
              de pique-nique.
              <br />
              Offrant une vue sur la montagne, ce chalet comprend une terrasse,
              un coin salon, une télévision par satellite à écran plat, une
              cuisine entièrement équipée avec un lave-vaisselle et un
              micro-ondes ainsi qu&apos;une salle de bains privative pourvue
              d&apos;une douche et d&apos;un sèche-cheveux. Un grille-pain, un
              réfrigérateur, des plaques de cuisson, une machine à café et une
              bouilloire sont également fournis. Le linge de lit et les
              serviettes sont fournis.
              <br />
              En été, vous pourrez utiliser le barbecue et dîner sur le balcon
              privé.
              <br />
              Un service de location de vélos est assuré sur place pour vous
              permettre de partir à la découverte des environs. Vous pourrez
              pratiquer le ski et le vélo dans les environs. Un service de
              location de matériel de ski, un point de vente de forfaits de ski
              et un local à skis sont également disponibles sur place.
              <br />
              L&apos;aéroport le plus proche, celui de Mulhouse-Fribourg, est
              situé à 75 km.
              <br />
              Les couples apprécient particulièrement l&apos;emplacement de cet
              établissement. Ils lui donnent la note de 9,8 pour un séjour à
              deux.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);
