import { UserRaw } from '@domain/entities/user.js'
import { IUsersRepo } from '@domain/repos/users.js'
import { Route } from '@domain/routes.js'
import { Id } from '@domain/values/id.js'

export type DeleteUserReq = {
  id: Id
}

export class DeleteUserRoute implements Route<DeleteUserReq, UserRaw> {
  constructor(private readonly repo: IUsersRepo) {}

  async execute(req: DeleteUserReq) {
    const user = await this.repo.findByIdOrFail(req.id)

    await this.repo.delete(req.id)

    return user.toRaw()
  }
}
