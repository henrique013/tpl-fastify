import { route } from '@app/routes/system/health.js'
import { type RouteOptions } from 'fastify'

export const routeOpt: RouteOptions = {
  method: 'GET',
  url: '/system/health',
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
    const { uptime } = request.query as { uptime: boolean }
    const json = route(uptime)
    reply.send(json)
  },
}
