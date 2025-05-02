import { Redis } from 'ioredis'

export interface IRequestCountersRepo {
  increment(key: string): Promise<number>
}

export class RedisRequestCountersRepo implements IRequestCountersRepo {
  private readonly db: Redis

  constructor(db: Redis) {
    this.db = db
  }

  async increment(key: string): Promise<number> {
    const count = await this.db.incr(key)
    return count
  }
}
