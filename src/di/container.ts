import 'reflect-metadata'
import { container } from 'tsyringe'
import { t } from '@di/tokens.js'
import { Pool } from 'pg'
import { Redis } from 'ioredis'
import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from '@db/schema.js'
import env from '@app/env.js'

const pgPool = new Pool({
  connectionString: env.PG_API_URL,
})

container.register(t.PgPool, {
  useValue: pgPool,
})

container.register(t.Pg, {
  useValue: drizzle(pgPool, { schema }),
})

container.register(t.Redis, {
  useValue: new Redis(env.REDIS_URL),
})

container.register(t.IUsersRepo, {
  useClass: class {
    // Implementação temporária até termos a classe real
    constructor() {}
  },
})

export { container }
