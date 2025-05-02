import { IRequestCountersRepo } from '@app/repos/request-counters.js'

export default async function (repo: IRequestCountersRepo, method: string, url: string): Promise<void> {
  const key = `${method}:${url}`

  const count = await repo.increment(key)

  console.log(`${key}: ${count}`)
}
