import env from '@app/env.js'
import pg, { Pool } from 'pg'

export async function connectToPgPool(): Promise<Pool> {
  const host = env.POSTGRES_HOST
  const port = env.POSTGRES_PORT
  const user = env.POSTGRES_USER
  const password = env.POSTGRES_PASSWORD
  const database = env.POSTGRES_DB

  const pool = new Pool({
    host,
    port,
    user,
    password,
    database,

    //TODO: Configure these values
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  })

  return pool
}

/*
 * Register custom type parsers
 */

// OID's
const JSONB_OID = 3802

// remove the default type parser for JSONB
pg.types.setTypeParser(JSONB_OID, (value: string) => value)
