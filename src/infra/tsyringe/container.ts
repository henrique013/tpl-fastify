import { container } from 'tsyringe'
import { registerLibs } from '@infra/tsyringe/providers/libs.js'
import { registerRepos } from '@infra/tsyringe/providers/repos.js'
import { registerRoutes } from '@infra/tsyringe/providers/routes.js'
import { registerUsersRoutes } from '@infra/tsyringe/providers/routes.users.js'

registerLibs(container)
registerRepos(container)
registerRoutes(container)
registerUsersRoutes(container)

export { container }
