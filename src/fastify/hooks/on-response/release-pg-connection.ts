import type { FastifyRequest, onResponseAsyncHookHandler } from 'fastify'

export const hook: onResponseAsyncHookHandler = async function (request: FastifyRequest) {
  request.pgPoolClient.release()
}
