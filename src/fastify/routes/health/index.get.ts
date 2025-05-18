import { route } from '@app/routes/health/index.get.js'
import { RouteOptions } from 'fastify'

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
    const { uptime } = request.query as { uptime?: boolean }
    const json = route(uptime ?? false)

    reply.send(json)
  },
}
