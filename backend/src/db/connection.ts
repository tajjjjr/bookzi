import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema.js';

const isDev = process.env.NODE_ENV !== 'production';

const client = createClient({
  url: isDev ? 'file:./dev.sqlite' : process.env.DATABASE_URL!,
  authToken: isDev ? undefined : process.env.DATABASE_AUTH_TOKEN,
});

export const db = drizzle(client, { schema });
export type Database = typeof db;