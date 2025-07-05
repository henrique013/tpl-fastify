import { DependencyContainer } from 'tsyringe'
import { t } from '@infra/container/tokens.js'
import { ICacheProvider } from '@domain/providers/cache.js'
import { CacheRedisProvider } from '@infra/providers/cache.redis.js'
import { Redis } from 'ioredis'
import { env } from '@infra/env.js'

export function registerProviders(container: DependencyContainer) {
  const cache = createCacheProvider(container)

  container.register(t.providers.ICacheProvider, {
    useValue: cache,
  })
}

function createCacheProvider(container: DependencyContainer): ICacheProvider {
  const redis = container.resolve<Redis>(t.libs.Redis)

  return new CacheRedisProvider(redis, env.APP_NAME)
}
