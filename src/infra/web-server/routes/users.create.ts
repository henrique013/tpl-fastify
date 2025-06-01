import { CreateUserRoute } from '@domain/routes/users.create.js'
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

    const route = container.resolve<CreateUserRoute>(t.routes.CreateUserRoute)

    const json = await route.execute({
      name: body.name,
      email: body.email,
    })

    reply.code(201).send(json)
  },
}
