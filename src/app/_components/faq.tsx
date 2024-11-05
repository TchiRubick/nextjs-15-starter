import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PhoneCall } from 'lucide-react';

const questions = [
  {
    q: "Est-il possible d'arriver un peu après 18h ?",
    a: 'Oui vous pouvez arriver après 18h ?',
  },
  {
    q: "Nous souhaitons savoir s'il est facile d'accéder et de se garer près de vos chalets (nous avons un Ford CMax).",
    a: "Bonjour vous devez considéré que nous sommes en montagne et que les accès chemin ,rue sont étroit , avec une petite voiture comme la vôtre ,il n'y a aucun problème, vous pouvez accéder auprès des chalets.",
  },
  {
    q: 'Les draps et serviettes de toilette sont ils fournis ?',
    a: 'Les draps et serviettes de toilette sont fournis',
  },
  {
    q: 'Votre chalet peut il accueillir 5 adultes et 8 enfants ( de 2 à 16 ans)?',
    a: 'Désolé mais le plus grand peux accueillir 8 personnes maximum',
  },
  {
    q: 'Peut on faire de la luge au pied du chalet ?',
    a: "Oui c'est possible",
  },
  {
    q: 'Le ménage est-il à faire ou bien il est compris ? ',
    a: 'Le ménage est compris dans le prix , mais vous pouvez le faire si vous voulez !!!!',
  },
  {
    q: "Sur quel domaine de ski accède t'on le plus facilement ?",
    a: 'Les pistes de Larcenaire a Bussang',
  },
  {
    q: "Habitant en Belgique nous ne sommes pas encore sûrs de pouvoir voyager à l'étranger. Que se passe t'il si nous annulons 1 sem avant ?",
    a: 'Afin de vous faire une réponse appropriée pouvez vous indiquer vos dates (nombre de nuits) nombre de personnes et type de chalet sélectionné',
  },
  {
    q: "Acceptez vous la présence d'un petit chien dans le gîte ?",
    a: 'Désolé mais les animaux ne sont pas acceptés.',
  },
];

export const FAQ = () => (
  <div className='w-full px-4 py-20 lg:px-0 lg:py-40'>
    <div className='container mx-auto'>
      <div className='grid gap-10 lg:grid-cols-2'>
        <div className='flex flex-col gap-10'>
          <div className='flex flex-col gap-4'>
            <div>
              <Badge variant='outline'>FAQ</Badge>
            </div>
            <div className='flex flex-col gap-2'>
              <h4 className='font-regular max-w-xl text-left text-3xl tracking-tighter md:text-5xl'>
                Frequently Asked Questions
              </h4>
              <p className='max-w-xl text-left text-lg leading-relaxed tracking-tight text-muted-foreground lg:max-w-lg'>
                Need help with something? Here are some of the most common
                questions we get.
              </p>
            </div>
            <div className=''>
              <Button className='gap-4' variant='outline'>
                Any questions? Reach out <PhoneCall className='h-4 w-4' />
              </Button>
            </div>
          </div>
        </div>
        <Accordion type='single' collapsible className='w-full'>
          {questions.map((question, index) => (
            <AccordionItem key={index} value={'index-' + index}>
              <AccordionTrigger className='text-left font-bold'>
                {question.q}
              </AccordionTrigger>
              <AccordionContent>{question.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  </div>
);
