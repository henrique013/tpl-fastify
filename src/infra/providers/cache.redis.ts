import { Redis } from 'ioredis'
import { ICacheProvider } from '@domain/providers/cache.js'

export class CacheRedisProvider implements ICacheProvider {
  private readonly prefix: string
  private readonly redis: Redis

  constructor(redis: Redis, prefix: string) {
    this.redis = redis
    this.prefix = prefix
  }

  async get<T>(key: string): Promise<T | null> {
    const fullKey = this.getFullKey(key)
    const value = await this.redis.get(fullKey)
    const parsed = value ? (JSON.parse(value) as T) : null

    return parsed
  }

  async set<T>(key: string, value: T, ttlSec: number): Promise<void> {
    const fullKey = this.getFullKey(key)
    const serialized = JSON.stringify(value)
    await this.redis.setex(fullKey, ttlSec, serialized)
  }

  async del(key: string): Promise<void> {
    const fullKey = this.getFullKey(key)
    await this.redis.del(fullKey)
  }

  private getFullKey(key: string): string {
    return `${this.prefix}:${key}`
  }
}
