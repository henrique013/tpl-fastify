import { User } from '@app/entities/user.js'
import { Id } from '@app/values/id.js'
import { Pg } from '@db/postgres.js'
import { usersTable } from '@db/schema.js'
import { eq } from 'drizzle-orm'
import { Redis } from 'ioredis'

export interface IUsersRepo {
  create(user: User): Promise<User>

  update(user: User): Promise<User>

  delete(id: Id): Promise<void>

  findById(id: Id): Promise<User | null>

  findAll(): Promise<User[]>
}

export class PgUsersRepo implements IUsersRepo {
  constructor(private readonly db: Pg) {}

  async create(user: User): Promise<User> {
    const result = await this.db.insert(usersTable).values(user.toRaw()).returning()

    const newUser = User.fromRaw(result[0]!)

    return newUser
  }

  async update(user: User): Promise<User> {
    const userRaw = user.toRaw()

    delete userRaw.id

    const result = await this.db
      .update(usersTable)
      .set(userRaw)
      .where(eq(usersTable.id, user.idOrFail().toNumber()))
      .returning()

    const updatedUser = User.fromRaw(result[0]!)

    return updatedUser
  }

  async delete(id: Id): Promise<void> {
    await this.db.delete(usersTable).where(eq(usersTable.id, id.toNumber()))
  }

  async findById(id: Id): Promise<User | null> {
    const result = await this.db.select().from(usersTable).where(eq(usersTable.id, id.toNumber()))

    const user = result.length ? User.fromRaw(result[0]!) : null

    return user
  }

  async findAll(): Promise<User[]> {
    const result = await this.db.select().from(usersTable)

    const users = result.map(User.fromRaw)

    return users
  }
}

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
