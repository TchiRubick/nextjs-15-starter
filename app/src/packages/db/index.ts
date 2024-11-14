import { env } from '@/env';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './src/schema';

export { schema };

export const db = drizzle(env.DATABASE_URL, { schema });