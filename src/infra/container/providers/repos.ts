import { DependencyContainer } from 'tsyringe'
import { t } from '@infra/container/tokens.js'
import { PgUsersRepo } from '@infra/repos/users.pg.js'
import { DrizzlePg } from '@infra/orm/types.js'

export function registerRepos(container: DependencyContainer) {
  container.register(t.repos.IUsersRepo, {
    useFactory: (container) => {
      const db = container.resolve<DrizzlePg>(t.libs.DrizzlePg)
      return new PgUsersRepo(db)
    },
  })
}
