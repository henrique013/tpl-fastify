import { User } from '@app/entities/user.js'
import { Id } from '@app/values/id.js'
import { DrizzlePg } from '@drizzle/types.js'
import { usersTable } from '@drizzle/schema.js'
import { eq } from 'drizzle-orm'
import { IUsersRepo } from '@app/repos/users.js'

export class PgUsersRepo implements IUsersRepo {
  constructor(private readonly db: DrizzlePg) {}

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
