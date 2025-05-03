import env from '@app/env.js'
import { Pool } from 'pg'

export async function connectToPgPool(): Promise<Pool> {
  const pool = new Pool({
    host: env.PG_HOST,
    port: env.PG_PORT,
    user: env.PG_USER,
    password: env.PG_PASS,
    database: env.PG_DB,
  })
  return pool
}
