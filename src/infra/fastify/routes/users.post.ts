import { IUsersRepo } from '@app/repos/users.js'
import { RouteOptions } from 'fastify'
import { User } from '@app/entities/user.js'
import { container } from '@tsyringe/container.js'
import { t } from '@tsyringe/tokens.js'

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
    const body = request.body as { name: string; email: string }

    const repo = container.resolve<IUsersRepo>(t.repos.IUsersRepo)

    const user = User.fromRaw({
      name: body.name,
      email: body.email,
    })

    const newUser = await repo.create(user)

    reply.code(201).send(newUser.toRaw())
  },
}
