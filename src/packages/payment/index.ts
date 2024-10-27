import { env } from '@/env';
import { lemonSqueezySetup } from '@lemonsqueezy/lemonsqueezy.js';

export const configureLemonSqueezy = () => {
  lemonSqueezySetup({
    apiKey: env.LEMONSQUEEZY_API_KEY,
    onError: (error) => console.error('Error!', error),
  });
};
