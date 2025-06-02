import { User } from '@domain/entities/user.js'
import { Id } from '@domain/values/id.js'
import { DrizzlePg } from '@infra/orm/types.js'
import { usersTable } from '@infra/orm/schema.js'
import { eq } from 'drizzle-orm'
import { IUsersRepo } from '@domain/repos/users.js'
import { NotFoundError } from '@domain/errors/not-found.js'
import { Email } from '@domain/values/email.js'
import { ConflictError } from '@domain/errors/conflict.js'

export class PgUsersRepo implements IUsersRepo {
  constructor(private readonly db: DrizzlePg) {}

  async create(user: User): Promise<User> {
    const id = await this.findIdByEmail(user.email)

    if (id) {
      throw new ConflictError('User with this email already exists')
    }

    const userRaw = user.toRaw()

    delete userRaw.id

    const result = await this.db.insert(usersTable).values(userRaw).returning()

    const newUser = User.fromRaw(result[0]!)

    return newUser
  }

  async update(user: User): Promise<User> {
    const id = await this.findIdByEmail(user.email)

    if (id && id.toNumber() !== user.idOrFail().toNumber()) {
      throw new ConflictError('User with this email already exists')
    }

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

  async findByIdOrFail(id: Id): Promise<User> {
    const user = await this.findById(id)
    if (!user) {
      throw new NotFoundError('User not found')
    }
    return user
  }

  async findIdByEmail(email: Email): Promise<Id | null> {
    const result = await this.db
      .select({ id: usersTable.id })
      .from(usersTable)
      .where(eq(usersTable.email, email.toString()))

    const id = result.length ? Id.from(result[0]!.id) : null

    return id
  }

  async findAll(): Promise<User[]> {
    const result = await this.db.select().from(usersTable)

    const users = result.map(User.fromRaw)

    return users
  }
}
