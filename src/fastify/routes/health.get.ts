import { RouteOptions } from 'fastify'

type Response = {
  message: 'OK'
  timestamp: string
  uptime?: number
}

const routeOpt: RouteOptions = {
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
    const timestamp = new Date().toISOString()

    const json: Response = {
      message: 'OK',
      timestamp,
    }

    if (uptime) {
      json.uptime = process.uptime()
    }

    reply.send(json)
  },
}

export { routeOpt }
