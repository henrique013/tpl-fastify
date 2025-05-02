import { IRequestCountersRepo } from '@app/repos/request-counters.js'

export async function middleware(repo: IRequestCountersRepo, method: string, url: string): Promise<number> {
  const key = `${method}:${url}`
  const count = await repo.increment(key)
  return count
}
