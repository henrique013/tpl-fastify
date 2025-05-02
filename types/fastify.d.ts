import 'fastify'
import { Pool, PoolClient } from 'pg'
import Redis from 'ioredis'

declare module 'fastify' {
  interface FastifyInstance {
    pgPool: Pool
    redis: Redis
  }

  interface FastifyRequest {
    pgPoolClient: PoolClient
    redis: Redis
  }
}
