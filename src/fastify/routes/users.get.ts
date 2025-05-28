import { CachedUsersRepo, IUsersRepo, PgUsersRepo } from '@app/repos/users-repo.js'
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
    let repo: IUsersRepo = new PgUsersRepo(this.pg)
    repo = new CachedUsersRepo(repo, this.redis)

    const users = await repo.findAll()
    const usersRaw = users.map((user) => user.toRaw())

    reply.send(usersRaw)
  },
}
