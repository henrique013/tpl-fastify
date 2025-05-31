import { HelloWorldRoute } from '@app/routes/hello-world.js'
import { RouteOptions } from 'fastify'
import { container } from '@infra/container/container.js'
import { t } from '@infra/container/tokens.js'

export const routeOpt: RouteOptions = {
  method: 'GET',
  url: '/',
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
        required: ['message'],
      },
    },
  },
  handler: async function (_request, reply) {
    const route = container.resolve<HelloWorldRoute>(t.routes.HelloWorldRoute)

    const json = await route.execute()

    reply.send(json)
  },
}
