import { User, UserRaw } from '@domain/entities/user.js'
import { IUsersRepo } from '@domain/repos/users.js'
import { Id } from '@domain/values/id.js'
import { ConflictError } from '@domain/errors/conflict.js'
import { BadArgumentError } from '@domain/errors/bad-argument.js'
import { ICacheProvider } from '@domain/providers/cache.js'

export class UserService {
  private readonly CACHE_TTL_SEC = 60 * 60 * 24 // 1 day

  constructor(
    private readonly repo: IUsersRepo,
    private readonly cache: ICacheProvider
  ) {}

  async create(user: User): Promise<User> {
    if (user.id) {
      throw new BadArgumentError('User ID should not be set when creating a new user')
    }

    const idByEmail = await this.repo.findIdByEmail(user.email)

    if (idByEmail) {
      throw new ConflictError('User with this email already exists')
    }

    const newUser = await this.repo.create(user)

    await this.invalidateCache()

    return newUser
  }

  async update(user: User): Promise<User> {
    const id = user.idOrFail()

    await this.repo.findByIdOrFail(id)

    const idByEmail = await this.repo.findIdByEmail(user.email)

    if (idByEmail && idByEmail.toNumber() !== id.toNumber()) {
      throw new ConflictError('User with this email already exists')
    }

    const updatedUser = await this.repo.update(user)

    await this.invalidateCache(id.toNumber())

    return updatedUser
  }

  async delete(id: Id): Promise<User> {
    const user = await this.repo.findByIdOrFail(id)
    await this.repo.delete(id)

    await this.invalidateCache(id.toNumber())

    return user
  }

  async findOneOrFail(id: Id): Promise<User> {
    const idInt = id.toNumber()
    const cacheKey = this.getEntityCacheKey(idInt)

    const cached = await this.cache.get<UserRaw>(cacheKey)
    if (cached) {
      return User.fromRaw(cached)
    }

    const user = await this.repo.findByIdOrFail(id)

    await this.cacheUser(user)

    return user
  }

  async findAll(): Promise<User[]> {
    const cacheKey = this.getAllEntitiesCacheKey()

    const cached = await this.cache.get<UserRaw[]>(cacheKey)
    if (cached) {
      return cached.map(User.fromRaw)
    }

    const users = await this.repo.findAll()

    await this.cacheUsers(users)

    return users
  }

  private getEntityCacheKey(id: number): string {
    return `users:entity:${id}`
  }

  private getAllEntitiesCacheKey(): string {
    return 'users:all_entities'
  }

  private async cacheUser(user: User): Promise<void> {
    const id = user.idOrFail().toNumber()
    const key = this.getEntityCacheKey(id)
    const raw = user.toRaw()

    await this.cache.set(key, raw, this.CACHE_TTL_SEC)
  }

  private async cacheUsers(users: User[]): Promise<void> {
    const raws = users.map((user) => user.toRaw())
    const key = this.getAllEntitiesCacheKey()

    await this.cache.set(key, raws, this.CACHE_TTL_SEC)
  }

  private async invalidateCache(id?: number): Promise<void> {
    if (id) {
      const key = this.getEntityCacheKey(id)
      await this.cache.del(key)
    }

    const key = this.getAllEntitiesCacheKey()
    await this.cache.del(key)
  }
}
