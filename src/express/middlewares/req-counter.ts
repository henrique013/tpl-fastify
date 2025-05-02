import { Request, Response, NextFunction } from 'express'
import handler from '@app/middlewares/req-counter.js'
import { RedisRequestCountersRepo } from '@app/repos/request-counters.js'

export default async function (req: Request, _res: Response, next: NextFunction) {
  const { method, url, redis } = req

  const repo = new RedisRequestCountersRepo(redis!)

  await handler(repo, method, url)

  next()
}
