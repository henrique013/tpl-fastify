import { UserRaw } from '@app/entities/user.js'
import { IUsersRepo } from '@app/repos/users.js'
import { Route } from '@app/routes.js'
import { User } from '@app/entities/user.js'

export type CreateUserReq = {
  name: string
  email: string
}

export class CreateUserRoute implements Route<CreateUserReq, UserRaw> {
  constructor(private readonly repo: IUsersRepo) {}

  async execute(req: CreateUserReq) {
    const user = User.fromRaw({
      name: req.name,
      email: req.email,
    })

    const newUser = await this.repo.create(user)

    return newUser.toRaw()
  }
}
