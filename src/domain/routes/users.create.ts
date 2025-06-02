import { UserRaw } from '@domain/entities/user.js'
import { IUsersRepo } from '@domain/repos/users.js'
import { Route } from '@domain/routes.js'
import { User } from '@domain/entities/user.js'

export type CreateUserReq = {
  user: User
}

export class CreateUserRoute implements Route<CreateUserReq, UserRaw> {
  constructor(private readonly repo: IUsersRepo) {}

  async execute(req: CreateUserReq) {
    const newUser = await this.repo.create(req.user)

    return newUser.toRaw()
  }
}
