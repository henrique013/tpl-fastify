import { route, CreateUserRequest } from '@app/routes/users.post.js'
import { PgUsersRepo } from '@app/repos/users-repo.js'
import { RouteOptions } from 'fastify'

export const routeOpt: RouteOptions = {
  method: 'POST',
  url: '/users',
  schema: {
    body: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        email: { type: 'string' },
      },
      required: ['name', 'email'],
    },
    response: {
      201: {
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
    const user = await route(repo, request.body as CreateUserRequest)

    reply.code(201).send(user)
  },
}
