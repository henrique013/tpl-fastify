import { CachedUsersRepo, IUsersRepo, PgUsersRepo } from '@app/repos/users-repo.js'
import { RouteOptions } from 'fastify'
import { Id } from '@app/values/id.js'
import { NotFoundError } from '@app/errors.js'

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

    let repo: IUsersRepo = new PgUsersRepo(this.pg)
    repo = new CachedUsersRepo(repo, this.redis)

    const id = Id.from(params.id)
    const user = await repo.findById(id)

    if (!user) {
      throw new NotFoundError('User not found')
    }

    await repo.delete(id)

    reply.send(user.toRaw())
  },
}
