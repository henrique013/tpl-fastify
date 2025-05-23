import 'fastify'
import { Pool } from 'pg'
import Redis from 'ioredis'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import * as schema from '@db/schema.js'

declare module 'fastify' {
  interface FastifyInstance {
    pgPool: Pool
    drizzle: NodePgDatabase<typeof schema>
    redis: Redis
  }
}
