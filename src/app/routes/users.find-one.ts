import { UserRaw } from '@app/entities/user.js'
import { NotFoundError } from '@app/errors.js'
import { IUsersRepo } from '@app/repos/users.js'
import { Route } from '@app/routes.js'
import { Id } from '@app/values/id.js'

export type FindOneUserReq = {
  id: number
}

export class FindOneUserRoute implements Route<FindOneUserReq, UserRaw> {
  constructor(private readonly repo: IUsersRepo) {}

  async execute(req: FindOneUserReq) {
    const id = Id.from(req.id)
    const user = await this.repo.findById(id)

    if (!user) {
      throw new NotFoundError('User not found')
    }

    return user.toRaw()
  }
}
