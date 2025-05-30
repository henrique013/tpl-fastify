import { DependencyContainer } from 'tsyringe'
import { t } from '@di/tokens.js'
import { PgUsersRepo } from '@app/repos/users-repo.js'
import { CachedUsersRepo } from '@app/repos/users-repo.js'
import { DrizzlePg } from '@db/types.js'
import { Redis } from 'ioredis'

function registerRepos(container: DependencyContainer) {
  container.register(t.repos.IUsersRepo, {
    useFactory: (container) => {
      const db = container.resolve<DrizzlePg>(t.libs.DrizzlePg)
      const redis = container.resolve<Redis>(t.libs.Redis)

      return new CachedUsersRepo(new PgUsersRepo(db), redis)
    },
  })
}

export { registerRepos }
