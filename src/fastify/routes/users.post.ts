import { PgUsersRepo } from '@app/repos/users-repo.js'
import { RouteOptions } from 'fastify'
import { Email } from '@app/values/email.js'
import { Name } from '@app/values/name.js'
import { User } from '@app/entities/user.js'

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
    const repo = new PgUsersRepo(this.pg)

    const name = Name.from(body.name)
    const email = Email.from(body.email)

    const user = new User({
      name,
      email,
    })

    const newUser = await repo.create(user)

    reply.code(201).send(newUser.toRaw())
  },
}
