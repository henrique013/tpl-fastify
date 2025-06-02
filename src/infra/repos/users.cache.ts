import { User } from '@domain/entities/user.js'
import { Id } from '@domain/values/id.js'
import { Redis } from 'ioredis'
import { IUsersRepo } from '@domain/repos/users.js'
import { NotFoundError } from '@domain/errors/not-found.js'
import { Email } from '@domain/values/email.js'

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

    const key = this.getIdEntityKey(id)

    await this.cache.del(key)
  }

  async findById(id: Id): Promise<User | null> {
    const key = this.getIdEntityKey(id)
    const cachedUser = await this.cache.get(key)

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

  async findIdByEmail(email: Email): Promise<Id | null> {
    const key = this.getEmailIdKey(email)
    const cachedId = await this.cache.get(key)

    if (cachedId) {
      return Id.from(Number(cachedId))
    }

    const id = await this.repo.findIdByEmail(email)

    if (id) {
      await this.cache.set(key, id.toString(), 'EX', this.CACHE_TTL)
    }

    return id
  }

  async findAll(): Promise<User[]> {
    return this.repo.findAll()
  }

  private getIdEntityKey(id: Id): string {
    return `${this.CACHE_PREFIX}:id-entity:${id.toString()}`
  }

  private getEmailIdKey(email: Email): string {
    return `${this.CACHE_PREFIX}:email-id:${email.toString()}`
  }

  private async saveUserInCache(user: User): Promise<void> {
    const id = user.idOrFail()
    const email = user.email

    const idEntityKey = this.getIdEntityKey(id)
    const emailIdKey = this.getEmailIdKey(email)

    await this.cache.set(idEntityKey, JSON.stringify(user.toRaw()), 'EX', this.CACHE_TTL)
    await this.cache.set(emailIdKey, id.toString(), 'EX', this.CACHE_TTL)
  }
}
