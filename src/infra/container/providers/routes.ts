import { DependencyContainer } from 'tsyringe'
import { t } from '@infra/container/tokens.js'
import { HelloWorldRoute } from '@domain/routes/hello-world.js'
import { HealthRoute } from '@domain/routes/health.js'

export function registerRoutes(container: DependencyContainer) {
  container.register(t.routes.HelloWorldRoute, {
    useClass: HelloWorldRoute,
  })

  container.register(t.routes.HealthRoute, {
    useClass: HealthRoute,
  })
}
