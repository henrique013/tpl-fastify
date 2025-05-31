import Fastify, { FastifyInstance } from 'fastify'
import { BaseError } from '@app/errors.js'
import * as Sentry from '@sentry/node'

export type ServerOptions = {
  port: number
  debug: boolean
  sentry_dsn: string | undefined
}

export class Server {
  private constructor(
    private readonly fastify: FastifyInstance,
    private readonly options: ServerOptions
  ) {}

  static async create(options: ServerOptions): Promise<Server> {
    const fastify = this.createFastifyInstance(options.debug)

    this.setupCustomErrorHandler(fastify, options.sentry_dsn)

    await this.setupRoutes(fastify)

    return new Server(fastify, options)
  }

  private static createFastifyInstance(debug: boolean): FastifyInstance {
    const level = debug ? 'debug' : 'info'

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

  private static setupCustomErrorHandler(fastify: FastifyInstance, sentry_dsn?: string) {
    if (sentry_dsn) {
      Sentry.init({
        dsn: sentry_dsn,
        sendDefaultPii: true,
      })
    }

    fastify.setErrorHandler(function (error, _request, reply) {
      const json = {
        message: error.message,
        error: 'Internal Server Error',
        statusCode: 500,
      }

      if (error instanceof BaseError) {
        const status = error.toHttpStatus()

        json.error = status.name
        json.statusCode = status.code
      }

      if (sentry_dsn && json.statusCode >= 500) {
        Sentry.captureException(error)
      }

      reply.status(json.statusCode).send(json)
    })
  }

  private static async setupRoutes(fastify: FastifyInstance) {
    // index
    fastify.route((await import('@infra/web-server/routes/hello-world.js')).routeOpt)

    // health
    fastify.route((await import('@infra/web-server/routes/health.js')).routeOpt)

    // users
    fastify.route((await import('@infra/web-server/routes/users.find-all.js')).routeOpt)
    fastify.route((await import('@infra/web-server/routes/users.find-one.js')).routeOpt)
    fastify.route((await import('@infra/web-server/routes/users.delete.js')).routeOpt)
    fastify.route((await import('@infra/web-server/routes/users.update.js')).routeOpt)
    fastify.route((await import('@infra/web-server/routes/users.create.js')).routeOpt)
  }

  public async listen(): Promise<void> {
    try {
      const host = '0.0.0.0'
      const port = this.options.port

      await this.fastify.listen({ host, port })
    } catch (err) {
      this.fastify.log.error(err)
      process.exit(1)
    }
  }
}
