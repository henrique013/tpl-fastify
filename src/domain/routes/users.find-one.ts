import { UserRaw } from '@domain/entities/user.js'
import { IUsersRepo } from '@domain/repos/users.js'
import { Route } from '@domain/routes.js'
import { Id } from '@domain/values/id.js'

export type FindOneUserReq = {
  id: Id
}

export class FindOneUserRoute implements Route<FindOneUserReq, UserRaw> {
  constructor(private readonly repo: IUsersRepo) {}

  async execute(req: FindOneUserReq) {
    const user = await this.repo.findByIdOrFail(req.id)

    return user.toRaw()
  }
}
