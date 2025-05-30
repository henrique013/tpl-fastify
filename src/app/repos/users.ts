import { User } from '@app/entities/user.js'
import { Id } from '@app/values/id.js'

export interface IUsersRepo {
  create(user: User): Promise<User>

  update(user: User): Promise<User>

  delete(id: Id): Promise<void>

  findById(id: Id): Promise<User | null>

  findAll(): Promise<User[]>
}
