import { UserRaw } from '@domain/entities/user.js'
import { IUsersRepo } from '@domain/repos/users.js'
import { Route } from '@domain/routes.js'

export class FindAllUsersRoute implements Route<void, UserRaw[]> {
  constructor(private readonly repo: IUsersRepo) {}

  async execute() {
    const users = await this.repo.findAll()
    const usersRaw = users.map((user) => user.toRaw())

    return usersRaw
  }
}
