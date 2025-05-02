import { connectToRedis } from '@app/libs/ioredis.js'
import { connectToPgPool } from '@app/libs/pg.js'
import type { onReadyAsyncHookHandler } from 'fastify'

export const hook: onReadyAsyncHookHandler = async function () {
  const pg_pool = await connectToPgPool()
  const redis = await connectToRedis()
  this.pgPool = pg_pool
  this.redis = redis
}
