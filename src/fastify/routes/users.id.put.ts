import { IUsersRepo } from '@app/repos/users.js'
import { RouteOptions } from 'fastify'
import { NotFoundError } from '@app/errors.js'
import { Id } from '@app/values/id.js'
import { Email } from '@app/values/email.js'
import { Name } from '@app/values/name.js'
import { container } from '@di/container.js'
import { t } from '@di/tokens.js'

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

    const repo = container.resolve<IUsersRepo>(t.repos.IUsersRepo)

    const id = Id.from(params.id)
    const user = await repo.findById(id)

    if (!user) {
      throw new NotFoundError('User not found')
    }

    user.name = Name.from(body.name)
    user.email = Email.from(body.email)

    const updatedUser = await repo.update(user)

    reply.send(updatedUser.toRaw())
  },
}
