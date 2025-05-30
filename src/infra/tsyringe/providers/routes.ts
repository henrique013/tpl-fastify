import { DependencyContainer } from 'tsyringe'
import { t } from '@infra/tsyringe/tokens.js'
import { IndexGetRoute } from '@app/routes/hello-world.js'

export function registerRoutes(container: DependencyContainer) {
  container.register(t.routes['hello-world'], {
    useClass: IndexGetRoute,
  })
}
