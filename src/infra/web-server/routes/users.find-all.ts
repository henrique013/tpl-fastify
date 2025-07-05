import { UserService } from '@domain/services/users.js'
import { container } from '@infra/container/container.js'
import { t } from '@infra/container/tokens.js'
import { RouteOptions } from 'fastify'

export const routeOpt: RouteOptions = {
  method: 'GET',
  url: '/users',
  schema: {
    response: {
      200: {
        type: 'array',
        items: {
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
  },
  handler: async function (_request, reply) {
    const service = container.resolve<UserService>(t.services.UserService)

    const users = await service.findAll()
    const json = users.map((user) => user.toRaw())

    reply.send(json)
  },
}
