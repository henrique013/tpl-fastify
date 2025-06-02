import { RouteOptions } from 'fastify'

type HealthResponse = {
  message: string
  timestamp: string
  uptime?: number
}

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

    const json: HealthResponse = {
      message: 'OK',
      timestamp: new Date().toISOString(),
    }

    if (query.uptime) {
      json.uptime = process.uptime()
    }

    reply.send(json)
  },
}
