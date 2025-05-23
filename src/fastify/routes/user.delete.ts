import { route } from '@app/routes/user.delete.js'
import { PgUsersRepo } from '@app/repos/users-repo.js'
import { RouteOptions } from 'fastify'

export const routeOpt: RouteOptions = {
  method: 'DELETE',
  url: '/user/:id',
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
      404: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
        required: ['message'],
      },
    },
  },
  handler: async function (request, reply) {
    const repo = new PgUsersRepo(this.pg)
    const id = (request.params as { id: number }).id
    const user = await route(repo, id)

    if (!user) {
      return reply.status(404).send({ message: 'User not found' })
    }

    reply.send(user)
  },
}
