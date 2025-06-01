import { UserRaw } from '@domain/entities/user.js'
import { IUsersRepo } from '@domain/repos/users.js'
import { Route } from '@domain/routes.js'
import { Id } from '@domain/values/id.js'

export type DeleteUserReq = {
  id: number
}

export class DeleteUserRoute implements Route<DeleteUserReq, UserRaw> {
  constructor(private readonly repo: IUsersRepo) {}

  async execute(req: DeleteUserReq) {
    const id = Id.from(req.id)
    const user = await this.repo.findByIdOrFail(id)

    await this.repo.delete(id)

    return user.toRaw()
  }
}
