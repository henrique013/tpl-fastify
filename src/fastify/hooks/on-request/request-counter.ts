import { middleware } from '@app/middlewares/request-counter.js'
import { RedisRequestCountersRepo } from '@app/repos/request-counters.js'
import type { FastifyRequest, onRequestAsyncHookHandler } from 'fastify'

export const hook: onRequestAsyncHookHandler = async function (request: FastifyRequest) {
  const { method, url } = request
  const repo = new RedisRequestCountersRepo(request.redis)
  const count = await middleware(repo, method, url)

  request.log.info(`${method} ${url} | ${count}`)
}
