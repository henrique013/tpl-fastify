import { DeleteUserRoute } from '@domain/routes/users.delete.js'
import { Id } from '@domain/values/id.js'
import { container } from '@infra/container/container.js'
import { t } from '@infra/container/tokens.js'
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
    const route = container.resolve<DeleteUserRoute>(t.routes.DeleteUserRoute)

    const id = Id.from(params.id)

    const json = await route.execute({
      id,
    })

    reply.send(json)
  },
}
