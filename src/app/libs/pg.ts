import env from '@app/env.js'
import pg, { Pool } from 'pg'

export async function connectToPgPool(): Promise<Pool> {
  const host = env.PG_HOST
  const port = env.PG_PORT
  const user = env.PG_USER
  const password = env.PG_PASS
  const database = env.PG_DB

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
