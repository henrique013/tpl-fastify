import type { FastifyRequest, onRequestAsyncHookHandler } from 'fastify'

export const hook: onRequestAsyncHookHandler = async function (request: FastifyRequest) {
  request.pgPoolClient = await this.pgPool.connect()
  request.redis = this.redis
}
