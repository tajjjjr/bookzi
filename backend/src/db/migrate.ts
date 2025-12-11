import { migrate } from 'drizzle-orm/libsql/migrator';
import { db } from './connection.js';

export async function runMigrations() {
  console.log('Running migrations...');
  await migrate(db, { migrationsFolder: './drizzle' });
  console.log('Migrations completed');
}