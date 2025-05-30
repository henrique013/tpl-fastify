import { container } from 'tsyringe'
import { registerLibs } from '@tsyringe/providers/libs.js'
import { registerRepos } from '@tsyringe/providers/repos.js'

registerLibs(container)
registerRepos(container)

export { container }
