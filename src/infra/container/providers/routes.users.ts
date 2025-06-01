import { DependencyContainer } from 'tsyringe'
import { t } from '@infra/container/tokens.js'
import { IUsersRepo } from '@domain/repos/users.js'
import { FindAllUsersRoute } from '@domain/routes/users.find-all.js'
import { FindOneUserRoute } from '@domain/routes/users.find-one.js'
import { DeleteUserRoute } from '@domain/routes/users.delete.js'
import { UpdateUserRoute } from '@domain/routes/users.update.js'
import { CreateUserRoute } from '@domain/routes/users.create.js'

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

  container.register(t.routes.UpdateUserRoute, {
    useFactory: (container) => new UpdateUserRoute(container.resolve<IUsersRepo>(t.repos.IUsersRepo)),
  })

  container.register(t.routes.CreateUserRoute, {
    useFactory: (container) => new CreateUserRoute(container.resolve<IUsersRepo>(t.repos.IUsersRepo)),
  })
}
