import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { connection } from './config';


const pool = new Pool(connection);


const db = drizzle(pool);

export { db };