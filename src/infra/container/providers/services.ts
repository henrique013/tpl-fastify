import { DependencyContainer } from 'tsyringe'
import { t } from '@infra/container/tokens.js'
import { IUsersRepo } from '@domain/repos/users.js'
import { UserService } from '@domain/services/users.js'
import { CachedUserService } from '@infra/services/users.cached.js'
import { Redis } from 'ioredis'

export function registerServices(container: DependencyContainer) {
  container.register(t.services.IUserService, {
    useFactory: (container) => {
      const repo = container.resolve<IUsersRepo>(t.repos.IUsersRepo)
      const redis = container.resolve<Redis>(t.libs.Redis)
      return new CachedUserService(new UserService(repo), redis)
    },
  })
}
