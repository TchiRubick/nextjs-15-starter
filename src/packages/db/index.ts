import { env } from '@/env';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './src/schema';

export { alias } from 'drizzle-orm/pg-core';

export { schema };

export const db = drizzle(env.DATABASE_URL, { schema });
