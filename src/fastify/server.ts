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
  const fastify: FastifyInstance = Fastify({
    logger: {
      level: 'debug',
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
  // server decorators
  fastify.decorate('pgPool')
  fastify.decorate('redis')

  // request decorators
  fastify.decorateRequest('pgPoolClient')
  fastify.decorateRequest('redis')
}

async function setupHooks(fastify: FastifyInstance) {
  // on ready
  fastify.addHook('onReady', (await import('@fastify/hooks/on-ready/set-server-decorators.js')).hook)

  // on request
  fastify.addHook('onRequest', (await import('@fastify/hooks/on-request/set-request-decorators.js')).hook)
  fastify.addHook('onRequest', (await import('@fastify/hooks/on-request/req-counter.js')).hook)

  // on response
  fastify.addHook('onResponse', (await import('@fastify/hooks/on-response/release-pg-connection.js')).hook)
}

async function setupRoutes(fastify: FastifyInstance) {
  fastify.route((await import('@fastify/routes/index.get.js')).routeOpt)
  fastify.route((await import('@fastify/routes/system/health.get.js')).routeOpt)
}

async function listen(fastify: FastifyInstance) {
  try {
    await fastify.listen({ port: env.API_PORT, host: '0.0.0.0' })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
