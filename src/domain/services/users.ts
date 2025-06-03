import { User } from '@domain/entities/user.js'
import { IUsersRepo } from '@domain/repos/users.js'
import { Id } from '@domain/values/id.js'
import { ConflictError } from '@domain/errors/conflict.js'
import { BadArgumentError } from '@domain/errors/bad-argument.js'

export interface IUserService {
  create(user: User): Promise<User>

  update(user: User): Promise<User>

  delete(id: Id): Promise<User>

  findOneOrFail(id: Id): Promise<User>

  findAll(): Promise<User[]>
}

export class UserService implements IUserService {
  constructor(private readonly repo: IUsersRepo) {}

  async create(user: User): Promise<User> {
    if (user.id) {
      throw new BadArgumentError('User ID should not be set when creating a new user')
    }

    const idByEmail = await this.repo.findIdByEmail(user.email)

    if (idByEmail) {
      throw new ConflictError('User with this email already exists')
    }

    const newUser = await this.repo.create(user)

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

    return updatedUser
  }

  async delete(id: Id): Promise<User> {
    const user = await this.repo.findByIdOrFail(id)
    await this.repo.delete(id)
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
