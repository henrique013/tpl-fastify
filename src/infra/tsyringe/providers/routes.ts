import { DependencyContainer } from 'tsyringe'
import { t } from '@infra/tsyringe/tokens.js'
import { HelloWorldRoute } from '@app/routes/hello-world.js'
import { HealthRoute } from '@app/routes/health.js'

export function registerRoutes(container: DependencyContainer) {
  container.register(t.routes['hello-world'], {
    useClass: HelloWorldRoute,
  })

  container.register(t.routes['health'], {
    useClass: HealthRoute,
  })
}
