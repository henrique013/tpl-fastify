import { Redis } from 'ioredis'
import { User, UserRaw } from '@domain/entities/user.js'
import { IUserService } from '@domain/services/users.js'
import { Id } from '@domain/values/id.js'

export class CachedUserService implements IUserService {
  private readonly ENTITY_KEY_PREFIX = 'users:entity:'
  private readonly ALL_ENTITIES_KEY = 'users:all_entities'
  private readonly CACHE_TTL = 60 // 1 minute in seconds

  constructor(
    private readonly service: IUserService,
    private readonly redis: Redis
  ) {}

  async create(user: User): Promise<User> {
    const newUser = await this.service.create(user)
    await this.redis.del(this.ALL_ENTITIES_KEY)
    return newUser
  }

  async update(user: User): Promise<User> {
    const updatedUser = await this.service.update(user)
    const id = updatedUser.idOrFail().toNumber()

    await this.redis.del(this.getEntityKey(id))
    await this.redis.del(this.ALL_ENTITIES_KEY)

    return updatedUser
  }

  async delete(id: Id): Promise<User> {
    const user = await this.service.delete(id)
    const idNumber = id.toNumber()

    await this.redis.del(this.getEntityKey(idNumber))
    await this.redis.del(this.ALL_ENTITIES_KEY)

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
    const raw = user.toRaw()
    if (!user.id) return

    const id = user.id.toNumber()
    const key = this.getEntityKey(id)
    const value = JSON.stringify(raw)

    await this.redis.set(key, value, 'EX', this.CACHE_TTL)
  }

  private async cacheUsers(users: User[]): Promise<void> {
    const raws = users.map((user) => user.toRaw())
    const value = JSON.stringify(raws)

    await this.redis.set(this.ALL_ENTITIES_KEY, value, 'EX', this.CACHE_TTL)
  }
}
