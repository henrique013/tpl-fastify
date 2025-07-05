import { UserService } from '@domain/services/users.js'
import { container } from '@infra/container/container.js'
import { t } from '@infra/container/tokens.js'
import { RouteOptions } from 'fastify'
import { Id } from '@domain/values/id.js'

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
    const service = container.resolve<UserService>(t.services.UserService)

    const id = Id.from(params.id)
    const user = await service.findOneOrFail(id)
    const json = user.toRaw()

    reply.send(json)
  },
}
