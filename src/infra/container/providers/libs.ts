import { t } from '@infra/container/tokens.js'
import { DependencyContainer } from 'tsyringe'
import { Pool } from 'pg'
import { Redis } from 'ioredis'
import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from '@infra/orm/schema.js'
import { env } from '@infra/env.js'
import { DrizzlePg } from '@infra/orm/types.js'

const MAX_TIMEOUT_MS = 10_000

export function registerLibs(container: DependencyContainer) {
  const pgPool = new Pool({
    connectionString: env.PG_API_URL,
    connectionTimeoutMillis: MAX_TIMEOUT_MS,
  })

  const redis = new Redis(env.REDIS_URL, {
    connectTimeout: MAX_TIMEOUT_MS,
    commandTimeout: MAX_TIMEOUT_MS,
  })

  const drizzlePg: DrizzlePg = drizzle(pgPool, { schema })

  container.register(t.libs.PgPool, {
    useValue: pgPool,
  })

  container.register(t.libs.Redis, {
    useValue: redis,
  })

  container.register(t.libs.DrizzlePg, {
    useValue: drizzlePg,
  })
}
