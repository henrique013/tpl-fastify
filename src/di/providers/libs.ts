import { t } from '@di/tokens.js'
import { DependencyContainer } from 'tsyringe'
import { Pool } from 'pg'
import { Redis } from 'ioredis'
import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from '@db/schema.js'
import { env } from '@app/env.js'
import { DrizzlePg } from '@db/types.js'

function registerLibs(container: DependencyContainer) {
  const pgPool = new Pool({
    connectionString: env.PG_API_URL,
  })

  const redis = new Redis(env.REDIS_URL)

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

export { registerLibs }
