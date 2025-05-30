import { IUsersRepo } from '@app/repos/users.js'
import { RouteOptions } from 'fastify'
import { Id } from '@app/values/id.js'
import { NotFoundError } from '@app/errors.js'
import { container } from '@di/container.js'
import { t } from '@di/tokens.js'

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

    const repo = container.resolve<IUsersRepo>(t.repos.IUsersRepo)

    const id = Id.from(params.id)
    const user = await repo.findById(id)

    if (!user) {
      throw new NotFoundError('User not found')
    }

    reply.send(user.toRaw())
  },
}
