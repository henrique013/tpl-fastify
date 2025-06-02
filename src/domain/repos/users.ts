import { User } from '@domain/entities/user.js'
import { Email } from '@domain/values/email.js'
import { Id } from '@domain/values/id.js'

export interface IUsersRepo {
  create(user: User): Promise<User>

  update(user: User): Promise<User>

  delete(id: Id): Promise<void>

  findById(id: Id): Promise<User | null>

  findByIdOrFail(id: Id): Promise<User>

  findIdByEmail(email: Email): Promise<Id | null>

  findAll(): Promise<User[]>
}
