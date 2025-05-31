import { FindOneUserRoute } from '@app/routes/users.find-one.js'
import { container } from '@infra/tsyringe/container.js'
import { t } from '@infra/tsyringe/tokens.js'
import { RouteOptions } from 'fastify'

export const routeOpt: RouteOptions = {
  method: 'GET',
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

    const route = container.resolve<FindOneUserRoute>(t.routes.FindOneUserRoute)

    const json = await route.execute(params)

    reply.send(json)
  },
}
