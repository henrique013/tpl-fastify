import { HealthReq, HealthRoute } from '@app/routes/health.js'
import { RouteOptions } from 'fastify'
import { container } from 'tsyringe'
import { t } from '@infra/tsyringe/tokens.js'

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
    const route = container.resolve<HealthRoute>(t.routes.HealthRoute)

    const json = await route.execute(request.query as HealthReq)

    reply.send(json)
  },
}
