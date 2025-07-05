import { ICacheProvider } from '@domain/providers/cache.js'

export class CacheFakeProvider implements ICacheProvider {
  private readonly cache: Map<string, { value: unknown; expiresAt: number }> = new Map()

  async get<T>(key: string): Promise<T | null> {
    const item = this.cache.get(key)

    if (!item) return null

    if (item.expiresAt < Date.now()) {
      this.cache.delete(key)
      return null
    }

    return item.value as T
  }

  async set<T>(key: string, value: T, ttlSec: number): Promise<void> {
    const expiresAt = Date.now() + ttlSec * 1000

    this.cache.set(key, { value, expiresAt })
  }

  async del(key: string): Promise<void> {
    this.cache.delete(key)
  }
}
