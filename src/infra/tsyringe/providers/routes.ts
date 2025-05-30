import { DependencyContainer } from 'tsyringe'
import { t } from '@infra/tsyringe/tokens.js'
import { HelloWorldRoute } from '@app/routes/hello-world.js'
import { HealthRoute } from '@app/routes/health.js'
import { IUsersRepo } from '@app/repos/users.js'
import { FindAllUsersRoute } from '@app/routes/users.find-all.js'
import { FindOneUserRoute } from '@app/routes/users.find-one.js'

export function registerRoutes(container: DependencyContainer) {
  container.register(t.routes['hello-world'], {
    useClass: HelloWorldRoute,
  })

  container.register(t.routes['health'], {
    useClass: HealthRoute,
  })

  container.register(t.routes['users.find-all'], {
    useFactory: (container) => new FindAllUsersRoute(container.resolve<IUsersRepo>(t.repos.IUsersRepo)),
  })

  container.register(t.routes['users.find-one'], {
    useFactory: (container) => new FindOneUserRoute(container.resolve<IUsersRepo>(t.repos.IUsersRepo)),
  })
}
