import { DependencyContainer } from 'tsyringe'
import { t } from '@infra/tsyringe/tokens.js'
import { IUsersRepo } from '@app/repos/users.js'
import { FindAllUsersRoute } from '@app/routes/users.find-all.js'
import { FindOneUserRoute } from '@app/routes/users.find-one.js'
import { DeleteUserRoute } from '@app/routes/users.delete.js'
import { UpdateUserRoute } from '@app/routes/users.update.js'
import { CreateUserRoute } from '@app/routes/users.create.js'

export function registerUsersRoutes(container: DependencyContainer) {
  container.register(t.routes.FindAllUsersRoute, {
    useFactory: (container) => new FindAllUsersRoute(container.resolve<IUsersRepo>(t.repos.IUsersRepo)),
  })

  container.register(t.routes.FindOneUserRoute, {
    useFactory: (container) => new FindOneUserRoute(container.resolve<IUsersRepo>(t.repos.IUsersRepo)),
  })

  container.register(t.routes.DeleteUserRoute, {
    useFactory: (container) => new DeleteUserRoute(container.resolve<IUsersRepo>(t.repos.IUsersRepo)),
  })

  container.register(t.routes['users.update'], {
    useFactory: (container) => new UpdateUserRoute(container.resolve<IUsersRepo>(t.repos.IUsersRepo)),
  })

  container.register(t.routes['users.create'], {
    useFactory: (container) => new CreateUserRoute(container.resolve<IUsersRepo>(t.repos.IUsersRepo)),
  })
}
