import { FindAllUsersRoute } from '@app/routes/users.find-all.js'
import { container } from '@infra/tsyringe/container.js'
import { t } from '@infra/tsyringe/tokens.js'
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
    const route = container.resolve<FindAllUsersRoute>(t.routes['users.find-all'])

    const json = await route.execute()

    reply.send(json)
  },
}
