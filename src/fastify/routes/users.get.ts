import { route } from '@app/routes/users.get.js'
import { PgUsersRepo } from '@app/repos/users-repo.js'
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
    const repo = new PgUsersRepo(this.pg)
    const users = await route(repo)

    reply.send(users)
  },
}
