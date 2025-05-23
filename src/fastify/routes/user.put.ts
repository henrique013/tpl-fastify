import { route, UpdateUserRequest } from '@app/routes/user.put.js'
import { PgUsersRepo } from '@app/repos/users-repo.js'
import { RouteOptions } from 'fastify'

export const routeOpt: RouteOptions = {
  method: 'PUT',
  url: '/users/:id',
  schema: {
    params: {
      type: 'object',
      properties: {
        id: { type: 'number' },
      },
      required: ['id'],
    },
    body: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        email: { type: 'string' },
      },
      required: ['name', 'email'],
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
    const repo = new PgUsersRepo(this.pg)
    const id = (request.params as { id: number }).id
    const user = await route(repo, id, request.body as UpdateUserRequest)

    reply.send(user)
  },
}
