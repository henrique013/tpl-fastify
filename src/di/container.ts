import { container } from 'tsyringe'
import { registerLibs } from '@di/providers/libs.js'

registerLibs(container)

export { container }
