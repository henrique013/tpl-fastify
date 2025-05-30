import { IUsersRepo } from '@app/repos/users.js'
import { container } from '@tsyringe/container.js'
import { t } from '@tsyringe/tokens.js'
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
    const repo = container.resolve<IUsersRepo>(t.repos.IUsersRepo)

    const users = await repo.findAll()
    const usersRaw = users.map((user) => user.toRaw())

    reply.send(usersRaw)
  },
}
