import { User, UserRaw } from '@domain/entities/user.js'
import { IUsersRepo } from '@domain/repos/users.js'
import { Route } from '@domain/routes.js'

export type UpdateUserReq = {
  user: User
}

export class UpdateUserRoute implements Route<UpdateUserReq, UserRaw> {
  constructor(private readonly repo: IUsersRepo) {}

  async execute(req: UpdateUserReq) {
    const id = req.user.idOrFail()

    await this.repo.findByIdOrFail(id)

    const updatedUser = await this.repo.update(req.user)

    return updatedUser.toRaw()
  }
}
