'use server';

import { Greeting } from '@/components/greeting';
import { listProducts } from '@lemonsqueezy/lemonsqueezy.js';

export default async function Home() {
  const { data } = await listProducts({
    filter: {
      storeId: '#130321',
    },
  });

  console.log('Greeting', data);
  return (
    <div>
      <Greeting />
    </div>
  );
}
