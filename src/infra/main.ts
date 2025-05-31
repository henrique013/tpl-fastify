import 'reflect-metadata'
import { Server } from '@infra/web-server/server.js'
import { env } from '@infra/env.js'

const server = await Server.create({
  port: env.API_PORT,
  debug: env.API_DEBUG,
})

await server.listen()
