import { HealthRoute } from '@app/routes/health.js'
import { RouteOptions } from 'fastify'
import { container } from '@infra/container/container.js'
import { t } from '@infra/container/tokens.js'

export const routeOpt: RouteOptions = {
  method: 'GET',
  url: '/health',
  schema: {
    querystring: {
      type: 'object',
      properties: {
        uptime: { type: 'boolean' },
      },
      required: [],
    },
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
          timestamp: { type: 'string' },
          uptime: { type: 'number' },
        },
        required: ['message', 'timestamp'],
      },
    },
  },
  handler: async function (request, reply) {
    const query = request.query as { uptime?: boolean }

    const route = container.resolve<HealthRoute>(t.routes.HealthRoute)

    const json = await route.execute(query)

    reply.send(json)
  },
}
