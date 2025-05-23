import Fastify, { FastifyInstance } from 'fastify'
import env from '@app/env.js'

export async function up() {
  const fastify = createFastifyInstance()

  setupDecorators(fastify)

  await setupHooks(fastify)

  await setupRoutes(fastify)

  await listen(fastify)
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

function setupDecorators(fastify: FastifyInstance) {
  // fastify instance decorators
  fastify.decorate('pgPool')
  fastify.decorate('drizzle')
  fastify.decorate('redis')
}

async function setupHooks(fastify: FastifyInstance) {
  // on ready
  fastify.addHook('onReady', (await import('@fastify/hooks/on-ready/set-server-decorators.js')).hook)

  // on request
  fastify.addHook('onRequest', (await import('@fastify/hooks/on-request/request-counter.js')).hook)
}

async function setupRoutes(fastify: FastifyInstance) {
  // index
  fastify.route((await import('@fastify/routes/index.get.js')).routeOpt)

  // health
  fastify.route((await import('@fastify/routes/health.get.js')).routeOpt)

  // users
  fastify.route((await import('@fastify/routes/users.get.js')).routeOpt)
  fastify.route((await import('@fastify/routes/user.post.js')).routeOpt)
  fastify.route((await import('@fastify/routes/user.put.js')).routeOpt)
}

async function listen(fastify: FastifyInstance) {
  try {
    await fastify.listen({ port: env.API_PORT, host: '0.0.0.0' })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
