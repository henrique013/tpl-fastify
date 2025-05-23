import env from '@app/env.js'
import type { onReadyAsyncHookHandler } from 'fastify'
import { Redis } from 'ioredis'
import { Pool } from 'pg'
import * as schema from '@db/schema.js'
import { drizzle } from 'drizzle-orm/node-postgres'

export const hook: onReadyAsyncHookHandler = async function () {
  this.pgPool = new Pool({
    connectionString: env.PG_API_URL,
  })

  this.pg = drizzle(this.pgPool, { schema })

  //TODO: use url like pgPool
  this.redis = new Redis({
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
    password: env.REDIS_PASS,
    db: env.REDIS_DB,
  })
}
