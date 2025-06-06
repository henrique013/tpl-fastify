import { Redis } from 'ioredis'
import { User, UserRaw } from '@domain/entities/user.js'
import { IUserService } from '@domain/services/users.js'
import { Id } from '@domain/values/id.js'

export interface CachedUserServiceOptions {
  ttl_sec?: number
}

export class CachedUserService implements IUserService {
  private readonly ENTITY_KEY_PREFIX = 'users:entity:'
  private readonly ALL_ENTITIES_KEY = 'users:all_entities'

  private readonly service: IUserService
  private readonly redis: Redis
  private readonly ttl_sec: number

  constructor(service: IUserService, redis: Redis, options: CachedUserServiceOptions = {}) {
    this.service = service
    this.redis = redis
    this.ttl_sec = options.ttl_sec ?? 60
  }

  async create(user: User): Promise<User> {
    const newUser = await this.service.create(user)

    await this.invalidateCache()

    return newUser
  }

  async update(user: User): Promise<User> {
    const updatedUser = await this.service.update(user)
    const id = updatedUser.idOrFail().toNumber()

    await this.invalidateCache(id)

    return updatedUser
  }

  async delete(id: Id): Promise<User> {
    const user = await this.service.delete(id)
    const idNumber = id.toNumber()

    await this.invalidateCache(idNumber)

    return user
  }

  async findOneOrFail(id: Id): Promise<User> {
    const idNumber = id.toNumber()
    const key = this.getEntityKey(idNumber)
    const cached = await this.redis.get(key)

    if (cached) {
      const raw = JSON.parse(cached) as UserRaw
      return User.fromRaw(raw)
    }

    const user = await this.service.findOneOrFail(id)

    await this.cacheUser(user)

    return user
  }

  async findAll(): Promise<User[]> {
    const cached = await this.redis.get(this.ALL_ENTITIES_KEY)

    if (cached) {
      const raws = JSON.parse(cached) as UserRaw[]
      return raws.map(User.fromRaw)
    }

    const users = await this.service.findAll()

    await this.cacheUsers(users)

    return users
  }

  private getEntityKey(id: number): string {
    return `${this.ENTITY_KEY_PREFIX}${id}`
  }

  private async cacheUser(user: User): Promise<void> {
    const id = user.idOrFail().toNumber()
    const key = this.getEntityKey(id)
    const raw = user.toRaw()
    const value = JSON.stringify(raw)

    await this.redis.set(key, value, 'EX', this.ttl_sec)
  }

  private async cacheUsers(users: User[]): Promise<void> {
    const raws = users.map((user) => user.toRaw())
    const value = JSON.stringify(raws)

    await this.redis.set(this.ALL_ENTITIES_KEY, value, 'EX', this.ttl_sec)
  }

  private async invalidateCache(id?: number): Promise<void> {
    if (id) {
      const key = this.getEntityKey(id)
      await this.redis.del(key)
    }

    await this.redis.del(this.ALL_ENTITIES_KEY)
  }
}
