import 'fastify'
import { Pool } from 'pg'
import Redis from 'ioredis'
import { Pg } from '@db/postgres.js'

declare module 'fastify' {
  interface FastifyInstance {
    pgPool: Pool
    drizzle: Pg
    redis: Redis
  }
}
