import { User } from '@domain/entities/user.js'
import { Id } from '@domain/values/id.js'
import { Redis } from 'ioredis'
import { IUsersRepo } from '@domain/repos/users.js'
import { NotFoundError } from '@domain/errors.js'

export class CachedUsersRepo implements IUsersRepo {
  private readonly CACHE_PREFIX = 'users'
  private readonly CACHE_TTL = 60 * 60

  constructor(
    private readonly repo: IUsersRepo,
    private readonly cache: Redis
  ) {}

  async create(user: User): Promise<User> {
    const newUser = await this.repo.create(user)
    await this.saveUserInCache(newUser)
    return newUser
  }

  async update(user: User): Promise<User> {
    const updatedUser = await this.repo.update(user)
    await this.saveUserInCache(updatedUser)
    return updatedUser
  }

  async delete(id: Id): Promise<void> {
    await this.repo.delete(id)
    const cacheKey = this.getCacheKey(id)
    await this.cache.del(cacheKey)
  }

  async findById(id: Id): Promise<User | null> {
    const cacheKey = this.getCacheKey(id)
    const cachedUser = await this.cache.get(cacheKey)

    if (cachedUser) {
      return User.fromRaw(JSON.parse(cachedUser))
    }

    const user = await this.repo.findById(id)

    if (user) {
      await this.saveUserInCache(user)
    }

    return user
  }

  async findByIdOrFail(id: Id): Promise<User> {
    const user = await this.findById(id)
    if (!user) {
      throw new NotFoundError('User not found')
    }
    return user
  }

  async findAll(): Promise<User[]> {
    return this.repo.findAll()
  }

  private getCacheKey(id: Id): string {
    return `${this.CACHE_PREFIX}:${id.toString()}`
  }

  private async saveUserInCache(user: User): Promise<void> {
    const cacheKey = this.getCacheKey(user.idOrFail())
    await this.cache.set(cacheKey, JSON.stringify(user.toRaw()), 'EX', this.CACHE_TTL)
  }
}
