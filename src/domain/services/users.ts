import { User } from '@domain/entities/user.js'
import { IUsersRepo } from '@domain/repos/users.js'
import { Id } from '@domain/values/id.js'
import { ConflictError } from '@domain/errors/conflict.js'

export class UserService {
  constructor(private readonly repo: IUsersRepo) {}

  async create(user: User): Promise<User> {
    const existingId = await this.repo.findIdByEmail(user.email)

    if (existingId) {
      throw new ConflictError('User with this email already exists')
    }

    const newUser = await this.repo.create(user)

    return newUser
  }

  async update(user: User): Promise<User> {
    const id = user.idOrFail()

    const existingId = await this.repo.findIdByEmail(user.email)

    if (existingId && existingId.toNumber() !== id.toNumber()) {
      throw new ConflictError('User with this email already exists')
    }

    await this.repo.findByIdOrFail(id)

    const updatedUser = await this.repo.update(user)

    return updatedUser
  }

  async delete(id: Id): Promise<User> {
    const user = await this.repo.findByIdOrFail(id)

    await this.repo.delete(id)

    return user
  }

  async findOne(id: Id): Promise<User | null> {
    const user = await this.repo.findById(id)

    return user
  }

  async findOneOrFail(id: Id): Promise<User> {
    const user = await this.repo.findByIdOrFail(id)

    return user
  }

  async findAll(): Promise<User[]> {
    const users = await this.repo.findAll()

    return users
  }
}
