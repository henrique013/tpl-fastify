import { container } from 'tsyringe'
import { registerLibs } from '@infra/tsyringe/providers/libs.js'
import { registerRepos } from '@infra/tsyringe/providers/repos.js'

registerLibs(container)
registerRepos(container)

export { container }
