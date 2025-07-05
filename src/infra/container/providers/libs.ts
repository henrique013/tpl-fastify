import { t } from '@infra/container/tokens.js'
import { DependencyContainer } from 'tsyringe'
import { Pool } from 'pg'
import { Redis } from 'ioredis'
import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from '@infra/orm/schema.js'
import { env } from '@infra/env.js'
import { DrizzlePg } from '@infra/orm/types.js'

const MAX_TIMEOUT_MS = 5_000

export function registerLibs(container: DependencyContainer) {
  const redis = connectToRedis()
  const drizzlePg = connectToPg()

  container.register(t.libs.Redis, {
    useValue: redis,
  })

  container.register(t.libs.DrizzlePg, {
    useValue: drizzlePg,
  })
}

function connectToRedis(): Redis {
  const redis = new Redis(env.REDIS_URL, {
    connectTimeout: MAX_TIMEOUT_MS,
    commandTimeout: MAX_TIMEOUT_MS,
  })

  return redis
}

function connectToPg(): DrizzlePg {
  const pgPool = new Pool({
    connectionString: env.PG_API_URL,
    connectionTimeoutMillis: MAX_TIMEOUT_MS,
  })

  const drizzlePg: DrizzlePg = drizzle(pgPool, { schema })

  return drizzlePg
}
