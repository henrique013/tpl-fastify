import { User } from '@domain/entities/user.js'
import { IUserService } from '@domain/services/users.js'
import { container } from '@infra/container/container.js'
import { t } from '@infra/container/tokens.js'
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
    const params = request.params as { id: number }
    const body = request.body as { name: string; email: string }
    const service = container.resolve<IUserService>(t.services.IUserService)

    const user = User.fromRaw({
      id: params.id,
      name: body.name,
      email: body.email,
    })

    const updatedUser = await service.update(user)
    const json = updatedUser.toRaw()

    reply.send(json)
  },
}
