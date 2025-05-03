import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

import * as schema from "./schema"
const sql = neon(process.env.DATABASE_URL!); // to fire raw query

export const db = drizzle(sql, {schema});