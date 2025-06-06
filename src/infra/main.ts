import 'reflect-metadata'
import { Server } from '@infra/web-server/server.js'
import { env } from '@infra/env.js'

const server = await Server.create({
  port: env.API_PORT,
  debug: env.API_DEBUG,
  sentry_dsn: env.SENTRY_DSN,
})

await server.listen()
