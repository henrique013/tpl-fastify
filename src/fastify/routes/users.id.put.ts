import { CachedUsersRepo, IUsersRepo, PgUsersRepo } from '@app/repos/users-repo.js'
import { RouteOptions } from 'fastify'
import { NotFoundError } from '@app/errors.js'
import { Id } from '@app/values/id.js'
import { User } from '@app/entities/user.js'

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
    const params = request.params as { id: number }
    const body = request.body as { name: string; email: string }

    let repo: IUsersRepo = new PgUsersRepo(this.pg)
    repo = new CachedUsersRepo(repo, this.redis)

    const id = Id.from(params.id)
    const exists = await repo.exists(id)

    if (!exists) {
      throw new NotFoundError('User not found')
    }

    const user = User.fromRaw({
      id: params.id,
      name: body.name,
      email: body.email,
    })

    const updatedUser = await repo.update(user)

    reply.send(updatedUser.toRaw())
  },
}
