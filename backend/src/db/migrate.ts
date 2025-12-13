import { migrate } from 'drizzle-orm/libsql/migrator';
import { db } from './connection.js';
import { sql } from 'drizzle-orm';

export async function checkMigrationsNeeded(): Promise<boolean> {
  try {
    const result = await db.get(sql`SELECT name FROM sqlite_master WHERE type='table' AND name='__drizzle_migrations'`);
    return !result;
  } catch {
    return true;
  }
}

export async function runMigrations() {
  console.log('[INFO] Running migrations...');
  await migrate(db, { migrationsFolder: './drizzle' });
  console.log('[INFO] Migrations completed\n');
}
