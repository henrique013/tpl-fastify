import { container } from 'tsyringe'
import { registerLibs } from '@di/providers/libs.js'
import { registerRepos } from '@di/providers/repos.js'

registerLibs(container)
registerRepos(container)

export { container }
