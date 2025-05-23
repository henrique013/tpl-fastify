import { User } from '@app/entities/user.js'
import { Id } from '@app/values/id.js'
import { Pg } from '@db/postgres.js'
import { usersTable } from '@db/schema.js'
import { eq } from 'drizzle-orm'

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
    const newUserRaw = await this.db.insert(usersTable).values(user.toRaw()).returning()

    const newUser = User.fromRaw(newUserRaw[0]!)

    return newUser
  }

  async update(user: User): Promise<User> {
    const userRaw = user.toRaw()

    delete userRaw.id

    const updatedUserRaw = await this.db
      .update(usersTable)
      .set(userRaw)
      .where(eq(usersTable.id, user.idOrFail().toNumber()))
      .returning()

    const updatedUser = User.fromRaw(updatedUserRaw[0]!)

    return updatedUser
  }

  async delete(id: Id): Promise<void> {
    await this.db.delete(usersTable).where(eq(usersTable.id, id.toNumber()))
  }

  async findById(id: Id): Promise<User | null> {
    const userRaw = await this.db.select().from(usersTable).where(eq(usersTable.id, id.toNumber()))

    const user = userRaw.length ? User.fromRaw(userRaw[0]!) : null

    return user
  }

  async findAll(): Promise<User[]> {
    const userRaws = await this.db.select().from(usersTable)

    const users = userRaws.map(User.fromRaw)

    return users
  }
}
