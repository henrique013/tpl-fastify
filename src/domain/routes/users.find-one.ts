import { UserRaw } from '@domain/entities/user.js'
import { IUsersRepo } from '@domain/repos/users.js'
import { Route } from '@domain/routes.js'
import { Id } from '@domain/values/id.js'

export type FindOneUserReq = {
  id: number
}

export class FindOneUserRoute implements Route<FindOneUserReq, UserRaw> {
  constructor(private readonly repo: IUsersRepo) {}

  async execute(req: FindOneUserReq) {
    const id = Id.from(req.id)
    const user = await this.repo.findByIdOrFail(id)

    return user.toRaw()
  }
}
