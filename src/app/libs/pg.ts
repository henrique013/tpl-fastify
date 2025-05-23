import env from '@app/env.js'
import { Pool } from 'pg'

export async function connectToPgPool(): Promise<Pool> {
  const pool = new Pool({
    connectionString: env.PG_API_URL,
  })

  return pool
}
