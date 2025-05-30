import Fastify, { FastifyInstance } from 'fastify'
import { env } from '@infra/env.js'
import { BaseError } from '@app/errors.js'

export async function server(up = true): Promise<FastifyInstance> {
  const fastify = createFastifyInstance()

  setupErrorHandler(fastify)

  await setupRoutes(fastify)

  if (up) {
    await listen(fastify)
  }

  return fastify
}

function createFastifyInstance(): FastifyInstance {
  const level = env.API_DEBUG ? 'debug' : 'info'

  const fastify: FastifyInstance = Fastify({
    logger: {
      level,
      transport: {
        target: 'pino-pretty',
        options: {
          levelFirst: true,
          ignore: 'pid,hostname',
          colorize: true,
          singleLine: true,
        },
      },
    },
  })

  return fastify
}

function setupErrorHandler(fastify: FastifyInstance) {
  fastify.setErrorHandler(function (error, _request, reply) {
    if (error instanceof BaseError) {
      const status = error.toHttpStatus()

      const json = {
        message: error.message,
        error: status.name,
        statusCode: status.code,
      }

      reply.status(status.code).send(json)
    }
  })
}

async function setupRoutes(fastify: FastifyInstance) {
  // index
  fastify.route((await import('@infra/fastify/routes/index.get.js')).routeOpt)

  // health
  fastify.route((await import('@infra/fastify/routes/health.get.js')).routeOpt)

  // users
  fastify.route((await import('@infra/fastify/routes/users.get.js')).routeOpt)
  fastify.route((await import('@infra/fastify/routes/users.id.delete.js')).routeOpt)
  fastify.route((await import('@infra/fastify/routes/users.id.get.js')).routeOpt)
  fastify.route((await import('@infra/fastify/routes/users.id.put.js')).routeOpt)
  fastify.route((await import('@infra/fastify/routes/users.post.js')).routeOpt)
}

async function listen(fastify: FastifyInstance) {
  try {
    await fastify.listen({ port: env.API_PORT, host: '0.0.0.0' })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
