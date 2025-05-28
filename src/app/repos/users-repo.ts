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

export class CachedUsers Repo implements IUsersRepo {
  private readonly CACHE_PREFIX = 'users'
  private readonly CACHE_TTL = 60 * 60

  constructor(
    private readonly repo: IUsersRepo,
    private readonly cache: Redis
  ) {}

  async create(user: User): Promise<User> {
    const newUser = await this.repo.create(user)
    await this.invalidateCache()
    return newUser
  }

  async update(user: User): Promise<User> {
    const updatedUser = await this.repo.update(user)
    await this.invalidateCache()
    return updatedUser
  }

  async delete(id: Id): Promise<void> {
    await this.repo.delete(id)
    await this.invalidateCache()
  }

  async findById(id: Id): Promise<User | null> {
    const cacheKey = this.getCacheKey(id)
    const cachedUser = await this.cache.get(cacheKey)

    if (cachedUser) {
      return User.fromRaw(JSON.parse(cachedUser))
    }

    const user = await this.repo.findById(id)

    if (user) {
      await this.cache.set(cacheKey, JSON.stringify(user.toRaw()), 'EX', this.CACHE_TTL)
    }

    return user
  }

  async findAll(): Promise<User[]> {
    const users: User[] = []
    const stream = this.cache.scanStream({
      match: `${this.CACHE_PREFIX}:*`,
      count: 100,
    })

    for await (const keys of stream) {
      if (keys.length) {
        const cachedUsers = await this.cache.mget(keys)
        for (const cachedUser of cachedUsers) {
          if (cachedUser) {
            users.push(User.fromRaw(JSON.parse(cachedUser)))
          }
        }
      }
    }

    if (users.length > 0) {
      return users
    }

    const dbUsers = await this.repo.findAll()
    const pipeline = this.cache.pipeline()

    for (const user of dbUsers) {
      const cacheKey = this.getCacheKey(user.idOrFail())
      pipeline.set(cacheKey, JSON.stringify(user.toRaw()), 'EX', this.CACHE_TTL)
    }

    await pipeline.exec()

    return dbUsers
  }

  private getCacheKey(id: Id): string {
    return `${this.CACHE_PREFIX}:${id.toString()}`
  }

  private async invalidateCache(): Promise<void> {
    const stream = this.cache.scanStream({
      match: `${this.CACHE_PREFIX}:*`,
      count: 100,
    })

    const pipeline = this.cache.pipeline()
    for await (const keys of stream) {
      if (keys.length) {
        pipeline.del(...keys)
      }
    }

    await pipeline.exec()
  }
}
