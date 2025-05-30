import { RouteOptions } from 'fastify'

const routeOpt: RouteOptions = {
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
    reply.send({
      message: 'Hello, world!',
    })
  },
}

export { routeOpt }
