import { DependencyContainer } from 'tsyringe'
import { t } from '@infra/container/tokens.js'
import { IUsersRepo } from '@domain/repos/users.js'
import { UserService } from '@domain/services/users.js'
import { ICacheProvider } from '@domain/providers/cache.js'

export function registerServices(container: DependencyContainer) {
  container.register(t.services.IUserService, {
    useFactory: (container) => {
      const repo = container.resolve<IUsersRepo>(t.repos.IUsersRepo)
      const cache = container.resolve<ICacheProvider>(t.providers.ICacheProvider)
      return new UserService(repo, cache)
    },
  })
}
