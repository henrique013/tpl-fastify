import { DependencyContainer } from 'tsyringe'
import { t } from '@infra/container/tokens.js'
import { IUsersRepo } from '@domain/repos/users.js'
import { UserService } from '@domain/services/users.js'

export function registerServices(container: DependencyContainer) {
  container.register(t.services.UserService, {
    useFactory: (container) => {
      const repo = container.resolve<IUsersRepo>(t.repos.IUsersRepo)
      return new UserService(repo)
    },
  })
}
