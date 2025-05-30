import { DeleteUserRoute } from '@app/routes/users.delete.js'
import { container } from '@infra/tsyringe/container.js'
import { t } from '@infra/tsyringe/tokens.js'
import { RouteOptions } from 'fastify'

export const routeOpt: RouteOptions = {
  method: 'DELETE',
  url: '/users/:id',
  schema: {
    params: {
      type: 'object',
      properties: {
        id: { type: 'number' },
      },
      required: ['id'],
    },
    response: {
      200: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          email: { type: 'string' },
        },
        required: ['id', 'name', 'email'],
      },
    },
  },
  handler: async function (request, reply) {
    const params = request.params as { id: number }

    const route = container.resolve<DeleteUserRoute>(t.routes['users.delete'])

    const json = await route.execute(params)

    reply.send(json)
  },
}
