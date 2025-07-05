import { User } from '@domain/entities/user.js'
import { UserService } from '@domain/services/users.js'
import { container } from '@infra/container/container.js'
import { t } from '@infra/container/tokens.js'
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
    const body = request.body as { name: string; email: string }
    const service = container.resolve<UserService>(t.services.UserService)

    const user = User.fromRaw({
      name: body.name,
      email: body.email,
    })

    const newUser = await service.create(user)
    const json = newUser.toRaw()

    reply.code(201).send(json)
  },
}
