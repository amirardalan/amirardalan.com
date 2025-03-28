import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const connectionString =
  process.env.DATABASE_URL ??
  (() => {
    throw new Error('DATABASE_URL is not defined');
  })();

// Create a connection pool using pg
const pool = new Pool({
  connectionString,
});

// Initialize Drizzle with the pg pool
export const db = drizzle(pool);
