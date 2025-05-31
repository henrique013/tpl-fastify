import { container } from 'tsyringe'
import { registerLibs } from '@infra/container/providers/libs.js'
import { registerRepos } from '@infra/container/providers/repos.js'
import { registerRoutes } from '@infra/container/providers/routes.js'
import { registerUsersRoutes } from '@infra/container/providers/routes.users.js'

registerLibs(container)
registerRepos(container)
registerRoutes(container)
registerUsersRoutes(container)

export { container }
