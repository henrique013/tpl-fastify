import env from '@app/env.js'
import { Redis } from 'ioredis'

export async function connectToRedis() {
  const redis = new Redis({
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
    password: env.REDIS_PASS,
  })

  return redis
}
