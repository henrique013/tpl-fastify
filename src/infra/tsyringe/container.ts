import { container } from 'tsyringe'
import { registerLibs } from '@infra/tsyringe/providers/libs.js'
import { registerRepos } from '@infra/tsyringe/providers/repos.js'
import { registerRoutes } from '@infra/tsyringe/providers/routes.js'

registerLibs(container)
registerRepos(container)
registerRoutes(container)

export { container }
