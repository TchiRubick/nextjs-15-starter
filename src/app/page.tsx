'use server';

import { Greeting } from '@/components/greeting';

export default async function Home() {
  return (
    <div>
      <Greeting />
    </div>
  );
}
