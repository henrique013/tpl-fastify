import env from '@app/env.js'
import { Redis } from 'ioredis'

export function connectToRedis() {
  const redis = new Redis({
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
    password: env.REDIS_PASS,
    db: env.REDIS_DB,
  })

  return redis
}
