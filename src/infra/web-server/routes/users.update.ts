import { User } from '@domain/entities/user.js'
import { UpdateUserRoute } from '@domain/routes/users.update.js'
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
    const route = container.resolve<UpdateUserRoute>(t.routes.UpdateUserRoute)

    const user = User.fromRaw({
      id: params.id,
      name: body.name,
      email: body.email,
    })

    const json = await route.execute({
      user,
    })

    reply.send(json)
  },
}
